import { useEffect, useMemo, useCallback } from "react"
import { useSelf } from "@liveblocks/react"
import { createEditor } from "slate"
import { withReact, Slate, Editable, RenderElementProps, RenderLeafProps } from "slate-react"
import { withHistory } from "slate-history"
import { withStyle } from "@/plugins/slate-style"
import { withCommand } from "@/plugins/slate-command"
import { withHotkey } from "@/plugins/slate-hotkey"
import { withYjs, withCursors, YjsEditor } from "@slate-yjs/core"
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import { initialEditorValue } from "@/lib/slate"
import { CollabRole, Document } from "@/types/model"

import * as Y from "yjs"
import SlateElement from "./SlateElement"
import SlateLeaf from "./SlateLeaf"
import Cursors from "./Cursors"
import Avatars from "./Avatars"
import Toolbox from "@/components/toolbox/Toolbox"

export default function SlateEditor({ sharedType, provider, document, role, onRefetch }: Readonly<{
  sharedType: Y.XmlText, provider: LiveblocksYjsProvider, document: Document, role: CollabRole, onRefetch: () => void
}>) {
  const info = useSelf(self => self.info) || { }
  const editor = useMemo(() =>
    withCursors(
      withYjs(
        withHotkey(withCommand(withStyle(withHistory(withReact(createEditor()))))),
        sharedType
      ),
      provider.awareness as any, { data: info }
    ), [sharedType, provider.awareness, info]
  )

  useEffect(() => {
    YjsEditor.connect(editor)
    return () => YjsEditor.disconnect(editor)
  }, [editor])

  const renderElement = useCallback((props: RenderElementProps) => <SlateElement {...props} />, [])
  const renderLeaf = useCallback((props: RenderLeafProps) => <SlateLeaf {...props} />, [])

  return (<Slate editor={editor} initialValue={initialEditorValue}>
    <Toolbox document={document} role={role} onRefetch={onRefetch} />
    <Cursors>
      <Avatars />
      <Editable
        className="w-[800px] min-h-[1120px] bg-white px-24 py-20 outline-none"
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={editor.hotkeyHandler}
        readOnly={role === 'viewer'}
      />
    </Cursors>
  </Slate>)
}