"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { useError } from "@/hooks/use-error"
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react"
import { request } from "@/lib/api"
import { Document, CollabRole, Permission } from "@/types/model"

import CollabEditor from "@/components/editor/CollabEditor"
import Protect from "@/components/auth/Protect"
import Loading from "@/components/ui/Loading"

export default function Editor() {
  const { docId } = useParams()
  const { catchError } = useError()
  const { data: session, status } = useSession()
  const [document, setDocument] = useState<Document>()
  const [role, setRole] = useState<CollabRole>('viewer')
  const [update, setUpdate] = useState<number>(0)
  const refetchDocumentHandler = () => setUpdate(update => ++update)

  useEffect(() => {
    catchError(async () => {
      const { data } = await request({ url: `/documents/${docId}` })
      setDocument(data.document as Document)
    })()
  }, [update, status])

  useEffect(() => {
    catchError(async () => {
      if (status === 'authenticated') {
        const { data } = await request({ url: `/permissions/${docId}/${session.user._id}` })
        if (data.permission) setRole((data.permission as Permission).role)
      }
    })()
  }, [status])

  const room = `${docId}:${document?.content}`
  const authEndpoint = async (room?: string) => {
    try {
      const response = await request({
        url: '/collab/liveblocks-auth',
        method: 'POST',
        body: { docId, role, room },
        filtered: false
      })
      return response
    } catch (error) {
      catchError(async () => { throw new Error('Could not connect to the document.') })
    }
  }

  return (<main className='flex min-h-screen flex-col items-center justify-between'>
    <Protect />
    <section className='flex relative flex-col items-center space-y-5 min-h-screen bg-gradient-radial from-aqua-green via-sky-300 to-crystal-blue w-full p-5'>
      {document && <LiveblocksProvider authEndpoint={authEndpoint}>
        <RoomProvider id={room} initialPresence={{ cursor: null }}>
          <ClientSideSuspense fallback={<Loading />}>
            <CollabEditor
              document={document}
              role={role}
              onRefetch={refetchDocumentHandler}
            />
          </ClientSideSuspense>
        </RoomProvider>
      </LiveblocksProvider>}
    </section>
  </main >)
}