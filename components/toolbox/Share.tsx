import { useState } from "react"
import { useError } from "@/hooks/use-error"
import { Select, MenuItem, FormControl } from "@mui/material"
import { IoMdShare } from "react-icons/io"
import { Visibility, CollabRole } from "@/types/model"
import { grantPermission } from "@/lib/update"

import CopyLink from "./CopyLink"

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

export default function Share({ docId, visibility, owner }: Readonly<{ docId: string, visibility: Visibility, owner: boolean }>) {
  const [share, setShare] = useState<boolean>(false)
  const [focus, setFocus] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [role, setRole] = useState<CollabRole>('viewer')
  const [emailError, setEmailError] = useState<boolean>(false)
  const { catchError } = useError()
  const isCustomShareAllowed = owner && visibility === 'private'

  const emailChangeHandler = (event: any) => {
    const current = event.target.value
    setEmailError(!emailRegex.test(current))
    setEmail(current)
  }
  const shareHandler = catchError(async () => {
    await grantPermission({ docId, email, role })
    setShare(false)
  }, () => setShare(false))

  return (<div>
    <div
      className='relative flex items-center group hover:bg-slate-100 hover:rounded cursor-pointer p-1'
      onClick={() => setShare(true)}
    >
      <IoMdShare size={20} />
      <p className='text-sm absolute z-10 bg-slate-100 lg:group-hover:block hidden rounded p-1 left-6'>Share</p>
    </div>
    {share && <section className='absolute w-full h-screen top-0 left-0 flex justify-center items-center'>
      <div className={`${isCustomShareAllowed && 'w-full lg:w-9/12'} relative flex flex-col bg-slate-100 rounded-xl p-5 lg:p-10 space-y-5 mb-52 lg:mb-0`}>
        {isCustomShareAllowed ? <>
          <section className='flex justify-end'>
            <CopyLink />
          </section>
          <section className='relative flex flex-col'>
            {focus && <label className='absolute bottom-9'>Email</label>}
            <input type='email' value={email} placeholder={focus ? '' : 'Enter his/her email'}
              onChange={emailChangeHandler}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
              className={`${emailError && 'outline-red-500'} px-2 py-1 rounded`}
            />
          </section>
          <section className='flex flex-col lg:flex-row items-center lg:space-x-3 space-y-2 lg:space-y-0'>
            <FormControl sx={{ width: 120 }} size='small'>
              <Select value={role} onChange={event => setRole(event.target.value as CollabRole)}>
                <MenuItem value={'viewer'}>Viewer</MenuItem>
                <MenuItem value={'editor'}>Editor</MenuItem>
                <MenuItem value={'owner'}>Owner</MenuItem>
              </Select>
            </FormControl>
            <p>
              {role === 'viewer' ? 'He/she can view this document'
                : role === 'editor' ? 'He/she can edit this document'
                  : 'He/she can change settings of this document'
              }
            </p>
          </section>
          <section className='flex text-sm space-x-2 justify-evenly lg:pt-5 transition-colors'>
            <button className='bg-aqua-green opacity-80 hover:opacity-100 w-full p-2 rounded' onClick={shareHandler}>Share</button>
            <button className='bg-red-400 opacity-80 hover:opacity-100 w-20 p-2 rounded' onClick={() => setShare(false)}>Cancel</button>
          </section>
        </> : <>
          <section className='flex space-x-2 items-center'>
            <p>Share this document by this link!</p>
            <CopyLink />
          </section>
          <section className='text-sm text-center'>
            <button className='bg-aqua-green opacity-80 hover:opacity-100 w-32 p-2 rounded' onClick={() => setShare(false)}>Close</button>
          </section>
        </>}
      </div>
    </section >
    }
  </div >)
}