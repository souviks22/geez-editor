"use client"
import { useState, useContext } from "react"
import { useSession, signOut } from "next-auth/react"
import { authContext } from "@/context/auth-context"
import Image from "next/image"
import Protect from "../auth/Protect"

export default function Navbar() {
  const { data: session } = useSession()
  const [menu, setMenu] = useState<boolean>(false)
  const { active, toggleFallback } = useContext(authContext)
  return (<div className={`flex justify-end fixed z-10 w-full px-28 py-2 ${!active && 'backdrop-blur'}`}>
    {session
      ?
      <section className='relative cursor-pointer' onClick={() => setMenu(menu => !menu)}>
        <Image
          src={session.user?.image || '/user.png'}
          alt='User'
          width={40}
          height={40}
          className='rounded-full'
        />
        {menu &&
          <div className='w-32 bg-white absolute rounded my-3 tran'>
            <p onClick={() => signOut()} className='bg-sky-50 hover:bg-sky-100 px-5 py-1 cursor-pointer transition-colors duration-200 rounded shadow'>
              Sign Out
            </p>
          </div>
        }
      </section>
      :
      <p onClick={toggleFallback} className='bg-sky-50 hover:bg-sky-100 px-5 py-1 m-5 cursor-pointer transition-colors duration-200 rounded shadow'>
        Sign In
      </p>
    }
    {active && <Protect onClick={toggleFallback} />}
  </div>)
}