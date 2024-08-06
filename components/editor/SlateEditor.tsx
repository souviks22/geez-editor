"use client"
import { useMemo, useCallback } from "react"
import { createEditor } from "slate"
import { withReact, Slate, Editable, RenderElementProps, RenderLeafProps } from "slate-react"
import { withHistory } from "slate-history"
import { withStyle } from "@/plugins/slate-style"
import { withCommand } from "@/plugins/slate-command"
import { withHotkey } from "@/plugins/slate-hotkey"
import { initialEditorValue } from "@/lib/slate"
import SlateElement from "./SlateElement"
import SlateLeaf from "./SlateLeaf"

export default function SlateEditor() {
  const editor = useMemo(() => withHotkey(withCommand(withStyle(withHistory(withReact(createEditor()))))), [])
  const renderElement = useCallback((props: RenderElementProps) => <SlateElement {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <SlateLeaf {...props} />, [])
  return (<Slate editor={editor} initialValue={initialEditorValue}>
    <Editable
      className="min-h-screen bg-white p-20 outline-none"
      renderElement={renderElement}
      renderLeaf={renderLeaf}
      onKeyDown={editor.hotkeyHandler}
      autoFocus
      spellCheck
    />
  </Slate>)
}