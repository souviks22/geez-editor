"use client"
import { useSession } from "next-auth/react"
import Authentication from "./Authentication"
import Loading from "../ui/Loading"

export default function Protect({ onClick = () => { } }: Readonly<{ onClick?: () => void }>) {
  const { status } = useSession()
  return (<div className='absolute w-full top-0 left-0'>
    {status === 'loading' ? <Loading />
      : status === 'unauthenticated' &&
      <div
        className='w-full h-full absolute z-10 flex min-h-screen flex-col items-center justify-between p-24 backdrop-blur'
        onClick={onClick}
      >
        <Authentication />
      </div>}
  </div>)
}