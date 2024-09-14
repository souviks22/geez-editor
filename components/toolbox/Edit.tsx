import { useState } from "react"
import { useSlate, ReactEditor } from "slate-react"
import { useError } from "@/hooks/use-error"
import { MdEdit, MdEditDocument } from "react-icons/md"
import { CollabRole } from "@/types/model"

export default function Edit({ role }: Readonly<{ role: CollabRole }>) {
  const editor = useSlate()
  const [edit, setEdit] = useState<boolean>(false)
  const { catchError } = useError()
  const editingHandler = catchError(async () => {
    if (role === 'viewer') throw new Error('You are not authorized to edit.')
    setEdit(true)
    ReactEditor.focus(editor)
  }, () => setEdit(false))

  return (<div
    className='relative flex items-center group hover:bg-slate-100 hover:rounded cursor-pointer p-1'
    onClick={editingHandler}
  >
    {edit ? <MdEditDocument size={20} /> : <MdEdit size={20} />}
    <p className='text-sm absolute z-10 bg-slate-100 group-hover:block hidden rounded p-1 left-6'>Edit</p>
  </div>)
}