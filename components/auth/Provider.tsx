"use client"
import Image from "next/image"
import { signIn } from "next-auth/react"

export default function Provider({ name, icon, onClick = () => { } }: Readonly<{ name: string, icon: string, onClick?: () => void }>) {
  const signInHandler = () => {
    onClick()
    signIn(name.toLowerCase())
  }
  return (<div
    className='flex justify-center items-center rounded-full bg-white cursor-pointer hover:shadow'
    onClick={signInHandler}
  >
    <section className='p-2'>
      <Image
        src={icon}
        alt={name}
        width={25}
        height={25}
      />
    </section>
    <span className='px-5'>Continue with {name}</span>
  </div>)
}