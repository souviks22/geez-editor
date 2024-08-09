"use client"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Protect from "../auth/Protect"

export default function Navbar() {
  const { data: session } = useSession()
  const [auth, setAuth] = useState<boolean>(false)
  return (<div className={`flex justify-end fixed z-10 w-full px-28 py-5 ${!auth && 'backdrop-blur'}`}>
    {session
      ?
      <p onClick={() => signOut()} className='bg-sky-50 hover:bg-sky-100 px-5 py-1 m-5 cursor-pointer transition-colors duration-200 rounded shadow'>
        Sign Out
      </p>
      :
      <p onClick={() => setAuth(true)} className='bg-sky-50 hover:bg-sky-100 px-5 py-1 m-5 cursor-pointer transition-colors duration-200 rounded shadow'>
        Sign In
      </p>
    }
    {auth && <Protect onClick={() => setAuth(false)} />}
  </div>)
}