"use client"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"
import Protect from "../auth/Protect"

export default function Navbar() {
  const { data: session } = useSession()
  const [auth, setAuth] = useState<boolean>(false)
  return (<div className={`flex justify-end fixed z-10 w-full ${!auth && 'backdrop-blur'}`}>
    <section className='text-lg transition-colors p-5'>
      {session
        ?
        <p onClick={() => signOut()} className='px-5 py-1 cursor-pointer hover:bg-sky-100 animate-pulse hover:animate-none rounded'>
          Sign Out
        </p>
        :
        <p onClick={() => setAuth(true)} className='px-5 py-1 cursor-pointer hover:bg-sky-100 animate-pulse hover:animate-none rounded'>
          Sign In
        </p>
      }
    </section>
    {auth && <Protect onClick={() => setAuth(false)} />}
  </div>)
}