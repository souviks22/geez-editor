"use client"
import { useState, useEffect, useContext } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { AiOutlinePlus, AiFillProduct } from "react-icons/ai"
import { authContext } from "@/context/auth-context"
import { docContext } from "@/context/document-context"
import { request } from "@/lib/api"
import { Document } from "@/types/model"
import MyDocument from "@/components/explore/MyDocument"

export default function Explore() {
  const { toggleFallback } = useContext(authContext)
  const { changeDocHandler } = useContext(docContext)
  const { data: session } = useSession()
  const router = useRouter()

  const openEditorHandler = (document: Document) => {
    changeDocHandler(document._id, document.content)
    router.push('/editor')
  }
  const newDocumentHandler = async () => {
    if (session) {
      const { data } = await request({
        url: '/documents/new-doc',
        method: 'POST'
      })
      openEditorHandler(data.document)
    } else toggleFallback()
  }

  const [documents, setDocuments] = useState<Document[]>([])
  useEffect(() => {
    if (!session) return
    (async () => {
      const { data } = await request({ url: `/permissions/users/${session?.user._id}` })
      const documents = data.documents as Document[]
      setDocuments(documents)
    })()
  }, [session])

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
    <section className='w-full px-32 py-10'>
      <span className='text-xl'>My Documents</span>
      <div className='flex flex-col justify-center items-center min-h-96 p-10 gap-10'>
        {documents.length ?
          documents.map(document =>
            <MyDocument
              key={document._id} 
              document={document}
              onClick={openEditorHandler}
            />)
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