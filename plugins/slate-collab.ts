import { Editor, Operation, Transforms } from "slate"
import { slateType } from "slate-ot"
import { Socket, Type } from "sharedb/lib/sharedb"
import sharedb, { ShareDBSourceOptions } from "sharedb/lib/client"
import ReconnectingWebSocket from "reconnecting-websocket"
import ObjectID from "bson-objectid"

sharedb.types.register(slateType as Type)

export type CollabEditor = {
  initialValue: []
  operationHandler: () => void
}

export type CollabOptions = {
  docId: string,
  editorId: string,
  role: 'public' | 'private'
}

export const withCollab = (editor: Editor, { docId, editorId, role }: Readonly<CollabOptions>) => {
  const websocketURL = process.env.BACKEND_DOMAIN + `?docId=${docId}&role=${role}`
  const socket = new ReconnectingWebSocket(websocketURL, [], { maxEnqueuedMessages: 0 })
  const connection = new sharedb.Connection(socket as Socket)
  const doc = connection.get('editors', editorId)
  const socketId = new ObjectID().toHexString()

  doc.subscribe(() => {
    Transforms.removeNodes(editor, { at: [] })
    Transforms.insertNodes(editor, doc.data?.children, { at: [] })
    doc.on('op', (op: Operation | Operation[], options: ShareDBSourceOptions) => {
      if (options.source === socketId) return
      const ops = Array.isArray(op) ? op : [op]
      for (const op of ops) {
        Transforms.transform(editor, op)
      }
    })
  })

  editor.operationHandler = () => {
    for (const op of editor.operations) {
      if (op.type === 'set_selection') continue
      doc.submitOp(op, { source: socketId })
    }
  }

  return editor
}