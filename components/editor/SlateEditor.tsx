"use client"
import { useMemo, useCallback } from "react"
import { createEditor } from "slate"
import { withReact, Slate, Editable, RenderElementProps, RenderLeafProps } from "slate-react"
import { withHistory } from "slate-history"
import { withStyle } from "@/plugins/slate-style"
import { withCommand } from "@/plugins/slate-command"
import { withHotkey } from "@/plugins/slate-hotkey"
import { withCollab, CollabOptions } from "@/plugins/slate-collab"
import { initialEditorValue } from "@/lib/slate"
import SlateElement from "./SlateElement"
import SlateLeaf from "./SlateLeaf"

export default function SlateEditor({ docId, editorId, role }: Readonly<CollabOptions>) {
  const editor = useMemo(() => withCollab(withHotkey(withCommand(withStyle(withHistory(withReact(createEditor()))))),
    { docId, editorId, role }), [role]
  )
  const renderElement = useCallback((props: RenderElementProps) => <SlateElement {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <SlateLeaf {...props} />, [])
  return (<Slate editor={editor} initialValue={initialEditorValue}>
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