import { Editor, Element, Transforms, Node, Path } from "slate"
import { initialEditorValue } from "@/lib/slate"

export type CommandEditor = {
  isElementType: (type: string, internal: string, run: boolean) => boolean,
  isQuoteBlock: (run?: boolean) => boolean,
  toggleQuoteBlock: () => void,
  isBulltedList: (run?: boolean) => boolean,
  toggleBulletedList: () => void,
  isNumberedList: (run?: boolean) => boolean,
  toggleNumberedList: () => void,
  isHeading: (run?: boolean) => boolean,
  toggleHeading: () => void,
  changeFontSize: (increment: boolean) => void,
  selectPortion: (element: boolean) => void
}

const match = (node: Node, _path?: Path, type?: string) => !Editor.isEditor(node) && Element.isElement(node) && node.type === (type || 'paragraph')

export const withCommand = (editor: Editor) => {
  editor.isElementType = (type: string, internal: string = '', run: boolean) => {
    const [found] = Array.from(Editor.nodes(editor, { match: (n, p) => match(n, p, type) }))
    if (found && run) {
      Transforms.unwrapNodes(editor, { match: (n, p) => match(n, p, internal) })
      Transforms.setNodes(editor, { type: 'paragraph' })
    }
    return !!found
  }
  
  editor.isQuoteBlock = (run: boolean = false) => editor.isElementType('quote-block', 'inline', run)
  editor.toggleQuoteBlock = () => {
    if (editor.isQuoteBlock(true)) return
    Transforms.wrapNodes(editor, { type: 'quote-block', children: [] }, { match })
    Transforms.setNodes(editor, { type: 'inline' }, { match })
  }

  editor.isBulltedList = (run: boolean = false) => editor.isElementType('bulleted-list', 'list-item', run)
  editor.toggleBulletedList = () => {
    if (editor.isBulltedList(true)) return
    Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] }, { match })
    Transforms.setNodes(editor, { type: 'list-item' }, { match })
  }

  editor.isNumberedList = (run: boolean = false) => editor.isElementType('numbered-list', 'list-item', run)
  editor.toggleNumberedList = () => {
    if (editor.isNumberedList(true)) return
    Transforms.wrapNodes(editor, { type: 'numbered-list', children: [] }, { match })
    Transforms.setNodes(editor, { type: 'list-item' }, { match })
  }

  editor.isHeading = (run: boolean = false) => editor.isElementType('heading', '', run)
  editor.toggleHeading = () => {
    if (editor.isHeading(true)) return Editor.removeMark(editor, 'fontSize')
    Transforms.setNodes(editor, { type: 'heading' }, { match })
    editor.selectPortion(true)
    Editor.addMark(editor, 'fontSize', 3)
  }

  editor.changeFontSize = (increment: boolean) => {
    const bias = (editor.isHeading() ? 1 : 0.25) * (increment ? 1 : -1)
    const size = Editor.marks(editor)?.fontSize || 1
    Editor.addMark(editor, 'fontSize', Math.max(size + bias, 0.5))
  }

  editor.selectPortion = (element: boolean) => {
    if (!editor.selection) return
    if (!element) Transforms.select(editor, [])
    else Transforms.select(editor, editor.selection.anchor.path)
  }

  const { normalizeNode } = editor
  editor.normalizeNode = (entry) => {
    const [node] = entry
    if (Editor.isEditor(node) && node.children.length === 0) {
      Transforms.insertNodes(editor, initialEditorValue[0], { at: [0] })
    } else normalizeNode(entry)
  }

  return editor
}