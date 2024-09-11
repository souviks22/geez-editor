"use client"
import { useState, useContext } from "react"
import { useSession, signOut } from "next-auth/react"
import { authContext } from "@/context/auth-context"
import Image from "next/image"
import Link from "next/link"
import Protect from "../auth/Protect"

export default function Navbar() {
  const { data: session } = useSession()
  const [menu, setMenu] = useState<boolean>(false)
  const { active, toggleFallback } = useContext(authContext)
  return (<div className={`flex justify-between items-center fixed z-10 w-full px-28 py-2 ${!active && 'backdrop-blur'}`}>
    <Link
      href={'/'}
      className='hover:bg-sky-50 p-1 rounded'
    >
      <Image
        src={'/geez-logo.png'}
        alt='Geez'
        width={50}
        height={50}
        priority
      />
    </Link>
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
            <p onClick={() => signOut()} className='bg-sky-50 hover:bg-blue-100 px-5 py-2 cursor-pointer transition-colors duration-200 rounded shadow'>
              Sign Out
            </p>
          </div>
        }
      </section>
      :
      <p onClick={toggleFallback} className='bg-sky-50 hover:bg-sky-100 px-5 py-2 m-5 cursor-pointer transition-colors duration-200 rounded shadow'>
        Sign In
      </p>
    }
    {active &&
      <section className='absolute w-full top-0 left-0'>
        <Protect onClick={toggleFallback} />
      </section>
    }
  </div>)
}