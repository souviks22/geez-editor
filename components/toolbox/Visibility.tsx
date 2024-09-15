import { useState, useEffect } from "react"
import { useError } from "@/hooks/use-error"
import { CollabRole, Visibility, Permission } from "@/types/model"
import { Switch, FormControlLabel } from '@mui/material'
import { updateDocument } from "@/lib/update"
import { request } from "@/lib/api"

import UserPermission from "./UserPermission"

export default function Visiblity({ docId, visibility, role, onRefetch }: Readonly<{ docId: string, visibility: Visibility, role: CollabRole, onRefetch: () => void }>) {
  const [confirm, setConfirm] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(visibility === 'private')
  const [permissions, setPermissions] = useState<Permission[]>([])
  const { catchError } = useError()
  const isOwner = role === 'owner'

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

  const visibilitySwitch = <Switch checked={checked} onChange={visibilityChangeHandler} disabled={!isOwner} />
  return (<div>
    <span className='border text-sm rounded-xl px-2 py-1 cursor-pointer' onClick={() => setConfirm(true)}>
      {visibility}
    </span>
    {confirm && <section className='absolute w-full h-screen top-0 left-0 flex justify-center items-center'>
      <div className='w-4/5 bg-slate-100 text-center rounded-xl p-10 space-y-5'>
        <section>
          <p className='text-xl'>Settings</p>
          {!isOwner && <p className='text-sm text-center text-yellow-500'>
            (accessible to owners)
          </p>}
        </section>
        <section className='flex justify-between items-center w-full cursor-default'>
          <p className='text-lg'>Visibility</p>
          <FormControlLabel control={visibilitySwitch} label={checked ? 'Private' : 'Public'} />
        </section>
        <section className='space-y-2'>
          {permissions.map((permission, i) => <UserPermission key={i} position={i} permission={permission} role={role} />)}
        </section>
        <button className='bg-white hover:bg-aqua-green w-20 p-2 rounded' onClick={closeConfirmHandler}>
          Alright
        </button>
      </div>
    </section>}
  </div>)
}