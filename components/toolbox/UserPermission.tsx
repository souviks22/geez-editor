import { useState, useEffect } from "react"
import { useError } from "@/hooks/use-error"
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from "@mui/material"
import { CollabRole, Permission, User } from "@/types/model"
import { request } from "@/lib/api"
import { changePermission } from "@/lib/update"

import Image from "next/image"

export default function UserPermission({ position, permission, owner }: Readonly<{ position: number, permission: Permission, owner:boolean }>) {
  const [user, setUser] = useState<User>()
  const [role, setRole] = useState<CollabRole>(permission.role)
  const [loading, setLoading] = useState<boolean>(false)
  const { catchError } = useError()

  useEffect(() => {
    catchError(async () => {
      const { data } = await request({ url: `/users/${permission.user}` })
      setUser(data.user as User)
    })()
  }, [])

  const roleChangeHandler = (event: SelectChangeEvent) => {
    const changed = event.target.value as CollabRole
    setRole(changed)
    setLoading(true)
    catchError(async () => {
      await changePermission({ permissionId: permission._id, role: changed })
      setLoading(false)
    }, () => setLoading(false))()
  }

  return (<div>
    <div className='flex justify-between items-center'>
      <section className='flex items-center space-x-3'>
        {user && <Image
          src={user.image}
          alt={user.name}
          width={30}
          height={30}
          className='rounded-full'
        />}
        <p className='hidden lg:block'>{position ? `${user?.name} (${user?.email.split('@')[0]})` : 'You'}</p>
        <p className='block lg:hidden'>{position ? user && user.name.split(' ')[0] : 'You'}</p>
      </section>
      <FormControl sx={{ width: 120 }} size='small'>
        <InputLabel>Role</InputLabel>
        <Select value={role} label='Role' onChange={roleChangeHandler} disabled={!owner}>
          <MenuItem value={'viewer'}>Viewer</MenuItem>
          <MenuItem value={'editor'}>Editor</MenuItem>
          <MenuItem value={'owner'}>Owner</MenuItem>
        </Select>
      </FormControl>
    </div>
    {loading && <div className='block absolute bg-blue-600 h-0.5 animate-loading-bar' />}
  </div>)
}