import { Editor, Operation, Transforms, Descendant } from "slate"
import { slateType } from "slate-ot"
import { Socket, Type } from "sharedb/lib/sharedb"
import { initialEditorValue } from "@/lib/slate"

import ShareDBClient, { ShareDBSourceOptions } from "sharedb/lib/client"
import ReconnectingWebSocket from "reconnecting-websocket"
import ObjectID from "bson-objectid"

export type CollabEditor = {
  initialValue: Descendant[]
  operationHandler: () => void
}
export type CollabDoc = { docId: string, editorId: string }
export type CollabRole = 'owner' | 'viewer' | 'editor'
export type CollabOptions = { role: CollabRole, token: string } & CollabDoc

ShareDBClient.types.register(slateType as Type)
const api = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_WEBSOCKET_DOMAIN : 'ws://localhost:4000'

export const withCollab = (editor: Editor, { docId, editorId, role, token }: Readonly<CollabOptions>) => {
  if (!token || !editorId) {
    editor.initialValue = initialEditorValue
    return editor
  }
  const websocketURL = `${api}?docId=${docId}&role=${role}&token=${token}`
  const socket = new ReconnectingWebSocket(websocketURL)
  const connection = new ShareDBClient.Connection(socket as Socket)
  const doc = connection.get('editors', editorId)
  const socketId = new ObjectID().toHexString()

  doc.subscribe(() => {
    if (!doc.type) doc.create(initialEditorValue)
    editor.children = doc.data
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