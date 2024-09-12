import { useEffect, useMemo, useCallback } from "react"
import { useSession } from "next-auth/react"
import { createEditor } from "slate"
import { withReact, Slate, Editable, RenderElementProps, RenderLeafProps } from "slate-react"
import { withHistory } from "slate-history"
import { withStyle } from "@/plugins/slate-style"
import { withCommand } from "@/plugins/slate-command"
import { withHotkey } from "@/plugins/slate-hotkey"
import { withYjs, withCursors, YjsEditor } from "@slate-yjs/core"
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import { initialEditorValue } from "@/lib/slate"

import * as Y from "yjs"
import SlateElement from "./SlateElement"
import SlateLeaf from "./SlateLeaf"

export default function SlateEditor({ sharedType, provider }: Readonly<{ sharedType: Y.XmlText, provider: LiveblocksYjsProvider }>) {
  const { data: session } = useSession()
  const editor = useMemo(() =>
    withCursors(
      withYjs(
        withHotkey(withCommand(withStyle(withHistory(withReact(createEditor()))))),
        sharedType
      ),
      provider?.awareness as any,
      { data: { name: session?.user.name, picture: session?.user.image } }
    ), [sharedType, provider?.awareness, session?.user]
  )

  useEffect(() => {
    YjsEditor.connect(editor)
    return () => YjsEditor.disconnect(editor)
  }, [editor])

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