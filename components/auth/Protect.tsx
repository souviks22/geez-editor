"use client"
import { useSession } from "next-auth/react"
import Authentication from "./Authentication"

export default function Protect({ except, onClick = () => { } }: Readonly<{ except?: boolean, onClick?: () => void }>) {
  const { data: session } = useSession()
  return (<>
    {!except && !session &&
      <div
        className='w-full h-full absolute right-0 z-10 flex min-h-screen flex-col items-center justify-between p-24 backdrop-blur'
        onClick={onClick}
      >
        <Authentication />
      </div>
    }
  </>)
}