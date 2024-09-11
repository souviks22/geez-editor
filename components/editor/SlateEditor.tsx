"use client"
import { useState, useEffect, useMemo, useCallback } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { createEditor } from "slate"
import { withReact, Slate, Editable, RenderElementProps, RenderLeafProps } from "slate-react"
import { withHistory } from "slate-history"
import { withStyle } from "@/plugins/slate-style"
import { withCommand } from "@/plugins/slate-command"
import { withHotkey } from "@/plugins/slate-hotkey"
import { withCollab, CollabRole } from "@/plugins/slate-collab"
import { Document } from "@/types/model"
import { request } from "@/lib/api"

import SlateElement from "./SlateElement"
import SlateLeaf from "./SlateLeaf"

export default function SlateEditor() {
  const { docId } = useParams()
  const [document, setDocument] = useState<Document>()
  const [role, setRole] = useState<CollabRole>('viewer')
  const { data: session } = useSession()

  useEffect(() => {
    (async () => {
      const { data } = await request({ url: `/documents/${docId}` })
      setDocument(data.document as Document)
    })()
  }, [])

  const editor = useMemo(() => withCollab(withHotkey(withCommand(withStyle(withHistory(withReact(createEditor()))))),
    {
      docId: docId as string,
      editorId: document?.content as string,
      role, token: session?.token as string
    }), [session?.token, document, role]
  )

  const renderElement = useCallback((props: RenderElementProps) => <SlateElement {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <SlateLeaf {...props} />, [])

  return (<Slate editor={editor} initialValue={editor.initialValue}>
    <Editable
      className="w-[794px] min-h-[1123px] bg-white px-24 py-20 outline-none"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onKeyDown={editor.hotkeyHandler}
      autoFocus
      spellCheck
    />
  </Slate>)
}