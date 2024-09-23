"use client"
import { useState, useEffect, useContext } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useError } from "@/hooks/use-error"
import { AiOutlinePlus, AiFillProduct } from "react-icons/ai"
import { authContext } from "@/context/auth-context"
import { request } from "@/lib/api"
import { Document } from "@/types/model"

import MyDocument from "@/components/explore/MyDocument"

export default function Explore() {
  const router = useRouter()
  const { data: session } = useSession()
  const { toggleFallback } = useContext(authContext)
  const [documents, setDocuments] = useState<Document[]>([])
  const { catchError } = useError()

  const newDocumentHandler = catchError(async () => {
    if (session) {
      const { data } = await request({
        url: '/documents/new-doc',
        method: 'POST'
      })
      const { _id } = data.document as Document
      router.push(`/documents/${_id}`)
    } else toggleFallback()
  })

  useEffect(() => {
    if (!session) return
    catchError(async () => {
      const { data } = await request({ url: `/permissions/users/${session?.user._id}` })
      const documents = data.documents as Document[]
      setDocuments(documents)
    })()
  }, [session?.user])

  return (<main className='flex min-h-screen flex-col items-center justify-evenly'>
    <section className='w-full bg-slate-100 p-10 flex flex-col justify-center items-center mt-20 lg:mb-20'>
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
    <section className='w-full p-5 lg:px-32 lg:py-10'>
      <span className='text-xl'>My Documents</span>
      <div className='flex flex-col items-center min-h-96 py-5 lg:p-10 gap-10'>
        {documents.length ?
          documents.map(document => <MyDocument key={document._id} document={document} />)
          :
          <aside className='flex flex-col items-center'>
            <AiFillProduct className='text-crystal-blue opacity-50' size={100} />
            <span>Empty</span>
          </aside>
        }
      </div>
    </section>
  </main>)
}