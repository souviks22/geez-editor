import { Editor, Element } from "slate"

export type StyleEditor = {
  isBoldActive: () => boolean,
  toggleBoldMark: () => void,
  isItalicActive: () => boolean,
  toggleItalicMark: () => void,
  isUnderlineActive: () => boolean,
  toggleUnderlineMark: () => void,
  isCodeActive: () => boolean,
  toggleCodeMark: () => void,
  isSubscriptActive: () => boolean,
  toggleSubscriptMark: () => void,
  isSuperscriptActive: () => boolean,
  toggleSuperscriptMark: () => void
}

export const withStyle = (editor: Editor) => {
  editor.isBoldActive = () => Editor.marks(editor)?.bold === true
  editor.toggleBoldMark = () => {
    if (editor.isBoldActive()) Editor.removeMark(editor, 'bold')
    else Editor.addMark(editor, 'bold', true)
  }

  editor.isItalicActive = () => Editor.marks(editor)?.italic === true
  editor.toggleItalicMark = () => {
    if (editor.isItalicActive()) Editor.removeMark(editor, 'italic')
    else Editor.addMark(editor, 'italic', true)
  }

  editor.isUnderlineActive = () => Editor.marks(editor)?.underline === true
  editor.toggleUnderlineMark = () => {
    if (editor.isUnderlineActive()) Editor.removeMark(editor, 'underline')
    else Editor.addMark(editor, 'underline', true)
  }

  editor.isCodeActive = () => Editor.marks(editor)?.code === true
  editor.toggleCodeMark = () => {
    const isActive = Editor.marks(editor)?.code === true
    if (editor.isCodeActive()) Editor.removeMark(editor, 'code')
    else Editor.addMark(editor, 'code', true)
  }

  editor.isSubscriptActive = () => Editor.marks(editor)?.script === 'sub'
  editor.toggleSubscriptMark = () => {
    if (editor.isSubscriptActive()) Editor.removeMark(editor, 'script')
    else Editor.addMark(editor, 'script', 'sub')
  }

  editor.isSuperscriptActive = () => Editor.marks(editor)?.script === 'super'
  editor.toggleSuperscriptMark = () => {
    if (editor.isSuperscriptActive()) Editor.removeMark(editor, 'script')
    else Editor.addMark(editor, 'script', 'super')
  }

  const { isInline } = editor
  editor.isInline = (element: Element) => {
    if (element.type === 'inline') return true
    return isInline(element)
  }

  return editor
}