import { Editor, Element } from "slate"

export type StyleEditor = {
  toggleBoldMark: () => void,
  toggleItalicMark: () => void,
  toggleUnderlineMark: () => void,
  toggleCodeMark: () => void,
  toggleSubscriptMark: () => void,
  toggleSuperscriptMark: () => void
}

export const withStyle = (editor: Editor) => {
  editor.toggleBoldMark = () => {
    const isActive = Editor.marks(editor)?.bold === true
    if (isActive) Editor.removeMark(editor, 'bold')
    else Editor.addMark(editor, 'bold', true)
  }
  editor.toggleItalicMark = () => {
    const isActive = Editor.marks(editor)?.italic === true
    if (isActive) Editor.removeMark(editor, 'italic')
    else Editor.addMark(editor, 'italic', true)
  }
  editor.toggleUnderlineMark = () => {
    const isActive = Editor.marks(editor)?.underline === true
    if (isActive) Editor.removeMark(editor, 'underline')
    else Editor.addMark(editor, 'underline', true)
  }
  editor.toggleCodeMark = () => {
    const isActive = Editor.marks(editor)?.code === true
    if (isActive) Editor.removeMark(editor, 'code')
    else Editor.addMark(editor, 'code', true)
  }
  editor.toggleSubscriptMark = () => {
    const isActive = Editor.marks(editor)?.script === 'sub'
    if (isActive) Editor.removeMark(editor, 'script')
    else Editor.addMark(editor, 'script', 'sub')
  }
  editor.toggleSuperscriptMark = () => {
    const isActive = Editor.marks(editor)?.script === 'super'
    if (isActive) Editor.removeMark(editor, 'script')
    else Editor.addMark(editor, 'script', 'super')
  }
  const { isInline } = editor
  editor.isInline = (element: Element) => {
    if (element.type === 'inline') return true
    return isInline(element)
  }
  return editor
}