import { Editor } from "slate"

export type HotkeyEditor = {
  hotkeyHandler: (event: React.KeyboardEvent) => void
}

export const withHotkey = (editor: Editor) => {
  editor.hotkeyHandler = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey) return
    event.preventDefault()
    switch (event.key) {
      case 'b': case 'B':
        editor.toggleBoldMark()
        break
      case 'i': case 'I':
        editor.toggleItalicMark()
        break
      case 'u': case 'U':
        editor.toggleUnderlineMark()
        break
      case '`':
        editor.toggleCodeMark()
        break
      case '=':
        editor.toggleSubscriptMark()
        break
      case '+':
        editor.toggleSuperscriptMark()
        break
      case 'z': case 'Z':
        editor.undo()
        break
      case 'y': case 'Y':
        editor.redo()
        break
      case 'q': case 'Q':
        editor.toggleQuoteBlock()
        break
      case '.':
        editor.toggleBulletedList()
        break
      case '1':
        editor.toggleNumberedList()
        break
      case 'h': case 'H':
        editor.toggleHeading()
        break
      case '>':
        editor.changeFontSize(true)
        break
      case '<':
        editor.changeFontSize(false)
        break
      case 'a': case 'A':
        if (event.shiftKey) editor.selectPortion(true)
        else editor.selectPortion(false)
        break
    }
  }
  return editor
}