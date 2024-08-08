"use client"
import { useSession } from "next-auth/react"
import Authentication from "./Authentication"

export default function Protect({ except }: Readonly<{ except?: boolean }>) {
  const { data: session } = useSession()
  return (<>
    {!except && !session && <Authentication />}
  </>)
}