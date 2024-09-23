import { useSlate } from "slate-react"
import { CollabRole, Document } from "@/types/model"
import {
  MdFormatBold, MdFormatItalic, MdFormatUnderlined, MdSubscript, MdSuperscript, MdCode,
  MdFormatQuote, MdFormatListBulleted, MdFormatListNumbered, MdHMobiledata, MdTextIncrease, MdTextDecrease
} from "react-icons/md"

import Naming from "./Naming"
import Visiblity from "./Visibility"
import Format from "./Format"
import Share from "./Share"
import Edit from "./Edit"

export default function Toolbox({ document, role, onRefetch }: Readonly<{ document: Document, role: CollabRole, onRefetch: () => void }>) {
  const editor = useSlate()
  const isOwner = role === 'owner'
  const actions = <section className='flex space-x-3'>
    <section className='flex space-x-3'>
      <div className='flex space-x-1'>
        <Format icon={<MdFormatBold />} label={'Bold'} shortcut={'B'} active={editor.isBoldActive()} onClick={editor.toggleBoldMark} />
        <Format icon={<MdFormatItalic />} label={'Italic'} shortcut={'I'} active={editor.isItalicActive()} onClick={editor.toggleItalicMark} />
        <Format icon={<MdFormatUnderlined />} label={'Underline'} shortcut={'U'} active={editor.isUnderlineActive()} onClick={editor.toggleUnderlineMark} />
      </div>
      <div className='flex space-x-1'>
        <Format icon={<MdSubscript />} label={'Subscript'} shortcut={'='} active={editor.isSubscriptActive()} onClick={editor.toggleSubscriptMark} />
        <Format icon={<MdSuperscript />} label={'Superscript'} shortcut={'+'} active={editor.isSuperscriptActive()} onClick={editor.toggleSuperscriptMark} />
        <Format icon={<MdCode />} label={'Code'} shortcut={'`'} active={editor.isCodeActive()} onClick={editor.toggleCodeMark} />
      </div>
    </section>
    <section className='flex space-x-3'>
      <div className='flex space-x-1'>
        <Format icon={<MdFormatQuote />} label={'Quote'} shortcut={','} active={editor.isQuoteBlock()} onClick={editor.toggleQuoteBlock} />
        <Format icon={<MdFormatListBulleted />} label={'Bulleted List'} shortcut={'.'} active={editor.isBulltedList()} onClick={editor.toggleBulletedList} />
        <Format icon={<MdFormatListNumbered />} label={'Numbered List'} shortcut={'1'} active={editor.isNumberedList()} onClick={editor.toggleNumberedList} />
      </div>
      <div className='flex space-x-1'>
        <Format icon={<MdHMobiledata />} label={'Heading'} shortcut={'H'} active={editor.isHeading()} onClick={editor.toggleHeading} />
        <Format icon={<MdTextIncrease />} label={'Font Increment'} shortcut={'>'} onClick={() => editor.changeFontSize(true)} />
        <Format icon={<MdTextDecrease />} label={'Font Decrement'} shortcut={'<'} onClick={() => editor.changeFontSize(false)} />
      </div>
    </section>
  </section>

  return (<div className='fixed top-20 lg:top-auto w-11/12 lg:w-2/3 bg-white z-10 p-1 lg:p-3 rounded shadow'>
    <div className='flex justify-between items-center'>
      <section>
        <div className="flex space-x-2 items-center">
          <Visiblity docId={document._id} visibility={document.visibility} owner={isOwner} onRefetch={onRefetch} />
          <Naming docId={document._id} current={document.title} />
        </div>
      </section>
      <section className='hidden lg:block'>
        {actions}
      </section>
      <section className='flex lg:space-x-1'>
        <Edit role={role} />
        <Share docId={document._id} visibility={document.visibility} owner={isOwner} />
      </section>
    </div>
    <div className='block lg:hidden overflow-scroll py-2'>
      {actions}
    </div>
  </div>)
}