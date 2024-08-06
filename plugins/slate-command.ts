import { Editor, Element, Transforms, Node } from "slate"

export type CommandEditor = {
  isElementType: (type: string, internal: string) => boolean,
  toggleQuoteBlock: () => void,
  toggleBulletedList: () => void,
  toggleNumberedList: () => void,
  toggleHeading: () => void,
  changeFontSize: (increment: boolean) => void,
  selectPortion: (element: boolean) => void
}

const check = (n: Node, type: string = 'paragraph') => !Editor.isEditor(n) && Element.isElement(n) && n.type === type

export const withCommand = (editor: Editor) => {
  editor.isElementType = (type: string, internal: string) => {
    const [match] = Array.from(Editor.nodes(editor, { match: n => check(n, type) }))
    if (match) {
      Transforms.unwrapNodes(editor, { match: n => check(n, internal) })
      Transforms.setNodes(editor, { type: 'paragraph' })
    }
    return !!match
  }
  editor.toggleQuoteBlock = () => {
    if (editor.isElementType('quote-block', 'inline')) return
    Transforms.wrapNodes(editor, { type: 'quote-block', children: [] }, { match: n => check(n) })
    Transforms.setNodes(editor, { type: 'inline' }, { match: n => check(n) })
  }
  editor.toggleBulletedList = () => {
    if (editor.isElementType('bulleted-list', 'list-item')) return
    Transforms.wrapNodes(editor, { type: 'bulleted-list', children: [] }, { match: n => check(n) })
    Transforms.setNodes(editor, { type: 'list-item' }, { match: n => check(n) })
  }
  editor.toggleNumberedList = () => {
    if (editor.isElementType('numbered-list', 'list-item')) return
    Transforms.wrapNodes(editor, { type: 'numbered-list', children: [] }, { match: n => check(n) })
    Transforms.setNodes(editor, { type: 'list-item' }, { match: n => check(n) })
  }
  editor.toggleHeading = () => {
    if (editor.isElementType('heading', '')) {
      Editor.removeMark(editor, 'fontSize')
      return
    }
    Transforms.setNodes(editor, { type: 'heading' }, { match: n => check(n) })
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
  return editor
}