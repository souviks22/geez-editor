import { Editor, Element, Transforms, Node, Path } from "slate"

export type CommandEditor = {
  isElementType: (type: string, internal?: string) => boolean,
  toggleQuoteBlock: () => void,
  toggleBulletedList: () => void,
  toggleNumberedList: () => void,
  toggleHeading: () => void,
  changeFontSize: (increment: boolean) => void,
  selectPortion: (element: boolean) => void
}

const check = (node: Node, _path?: Path, type?: string) => !Editor.isEditor(node) && Element.isElement(node) && node.type === (type || 'paragraph')

export const withCommand = (editor: Editor) => {
  editor.isElementType = (type: string, internal?: string) => {
    const [match] = Array.from(Editor.nodes(editor, { match: (n, p) => check(n, p, type) }))
    if (!match) return false
    Transforms.unwrapNodes(editor, { match: (n, p) => check(n, p, internal) })
    Transforms.setNodes(editor, { type: 'paragraph' })
    return true
  }

  editor.toggleQuoteBlock = () => {
    if (editor.isElementType('quote-block', 'inline')) return
    Transforms.wrapNodes(editor, { type: 'quote-block', children: [] }, { match: check })
    Transforms.setNodes(editor, { type: 'inline' }, { match: check })
  }

  editor.toggleBulletedList = () => {
    if (editor.isElementType('bulleted-list', 'list-item')) return
    Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] }, { match: check })
    Transforms.setNodes(editor, { type: 'list-item' }, { match: check })
  }

  editor.toggleNumberedList = () => {
    if (editor.isElementType('numbered-list', 'list-item')) return
    Transforms.wrapNodes(editor, { type: 'numbered-list', children: [] }, { match: check })
    Transforms.setNodes(editor, { type: 'list-item' }, { match: check })
  }

  editor.toggleHeading = () => {
    if (editor.isElementType('heading')) return Editor.removeMark(editor, 'fontSize')
    Transforms.setNodes(editor, { type: 'heading' }, { match: check })
    editor.selectPortion(true)
    Editor.addMark(editor, 'fontSize', 3)
  }

  editor.changeFontSize = (increment: boolean) => {
    const isHeading = editor.isElementType('heading', '')
    const bias = (isHeading ? 1 : 0.25) * (increment ? 1 : -1)
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
      Transforms.insertNodes(editor, [{ text: '' }], { at: [0] })
    } else normalizeNode(entry)
  }

  return editor
}