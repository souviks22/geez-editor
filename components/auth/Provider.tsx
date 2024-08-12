"use client"
import { usePathname } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image"

export default function Provider({ name, icon, onClick = () => { } }: Readonly<{ name: string, icon: string, onClick?: () => void }>) {
  const path = usePathname()
  const signInHandler = () => {
    onClick()
    signIn(name.toLowerCase())
    localStorage.setItem(process.env.REDIRECT_KEY as string, path)
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