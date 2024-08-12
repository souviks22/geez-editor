"use client"
import { useContext } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { AiOutlinePlus, AiFillProduct } from "react-icons/ai"
import { authContext } from "@/context/auth-context"

export default function Explore() {
  const { toggleFallback } = useContext(authContext)
  const { data: session } = useSession()
  const router = useRouter()
  const newDocumentHandler = () => {
    if (session) {
      router.push('/editor')
    } else {
      toggleFallback()
    }
  }
  return (<main className='flex min-h-screen flex-col items-center justify-evenly'>
    <section className='w-full bg-slate-100 p-10 flex flex-col justify-center items-center my-20'>
      <p className='p-5'>Create a new document</p>
      <div
        className='block w-52 h-72 bg-white cursor-pointer hover:shadow'
        onClick={newDocumentHandler}
      >
        <aside className='w-full h-full flex justify-center items-center'>
          <AiOutlinePlus className='text-aqua-green' size={70} />
        </aside>
      </div>
    </section>
    <section className='w-full p-10'>
      <span className='text-lg'>My Documents</span>
      <div className='flex justify-center items-center min-h-96'>
        <aside className='flex flex-col items-center'>
          <AiFillProduct className='text-crystal-blue opacity-50' size={100} />
          <span>Empty</span>
        </aside>
      </div>
    </section>
  </main>)
}