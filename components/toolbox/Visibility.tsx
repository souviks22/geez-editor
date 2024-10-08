import { useState, useEffect } from "react"
import { useError } from "@/hooks/use-error"
import { Visibility, Permission } from "@/types/model"
import { Switch, FormControlLabel } from '@mui/material'
import { updateDocument } from "@/lib/update"
import { request } from "@/lib/api"

import UserPermission from "./UserPermission"

export default function Visiblity({ docId, visibility, owner, onRefetch }: Readonly<{ docId: string, visibility: Visibility, owner:boolean, onRefetch: () => void }>) {
  const [confirm, setConfirm] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(visibility === 'private')
  const [permissions, setPermissions] = useState<Permission[]>([])
  const { catchError } = useError()

  const visibilityChangeHandler = catchError(async () => {
    setChecked(checked => !checked)
    await updateDocument({ docId, update: { visibility: checked ? 'public' : 'private' } })
  }, () => setConfirm(false))

  const closeConfirmHandler = () => {
    onRefetch()
    setConfirm(false)
  }

  useEffect(() => {
    catchError(async () => {
      const { data } = await request({ url: `/permissions/documents/${docId}` })
      const permissions = data.permissions as Permission[]
      setPermissions(permissions)
    })()
  }, [])

  const visibilitySwitch = <Switch checked={checked} onChange={visibilityChangeHandler} disabled={!owner} />
  return (<div>
    <span className='border text-sm rounded-xl px-2 py-1 cursor-pointer' onClick={() => setConfirm(true)}>
      {visibility}
    </span>
    {confirm && <section className='absolute w-full h-screen top-0 left-0 flex justify-center items-center'>
      <div className='w-full lg:w-4/5 bg-slate-100 text-center rounded-xl p-5 lg:p-10 space-y-5 mb-52 lg:mb-0'>
        <section>
          <p className='text-xl'>Settings</p>
          {!owner && <p className='text-sm text-center text-yellow-500'>
            (accessible to owners)
          </p>}
        </section>
        <section className='flex justify-between items-center w-full cursor-default'>
          <p className='text-lg'>Visibility</p>
          <FormControlLabel control={visibilitySwitch} label={checked ? 'Private' : 'Public'} />
        </section>
        <section className='space-y-2'>
          {permissions.map((permission, i) => <UserPermission key={i} position={i} permission={permission} owner={owner} />)}
        </section>
        <button className='bg-white hover:bg-aqua-green w-20 p-2 rounded' onClick={closeConfirmHandler}>
          Alright
        </button>
      </div>
    </section>}
  </div>)
}