"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { LiveblocksProvider, RoomProvider, ClientSideSuspense } from "@liveblocks/react"
import { request } from "@/lib/api"
import { Document } from "@/types/model"
import { authEndpoint } from "@/liveblocks.config"

import CollabEditor, { CollabRole } from "@/components/editor/CollabEditor"
import Protect from "@/components/auth/Protect"
import Loading from "@/components/ui/Loading"

export default function Editor() {
  const { docId } = useParams()
  const [document, setDocument] = useState<Document>()
  const [role, setRole] = useState<CollabRole>('editor')
  const [update, setUpdate] = useState<number>(0)
  const roomId = `${docId}:${document?.content}:${role}`

  useEffect(() => {
    (async () => {
      const { data } = await request({ url: `/documents/${docId}` })
      setDocument(data.document as Document)
    })()
  }, [update])

  const refetchDocumentHandler = () => setUpdate(update => ++update)

  return (<main className='flex min-h-screen flex-col items-center justify-between'>
    <Protect />
    <section className='flex relative flex-col items-center space-y-5 min-h-screen bg-gradient-radial from-aqua-green via-sky-300 to-crystal-blue w-full p-5'>
      {document?.content &&
        <LiveblocksProvider authEndpoint={authEndpoint}>
          <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
            <ClientSideSuspense fallback={<Loading />}>
              <CollabEditor document={document} onRefetch={refetchDocumentHandler} />
            </ClientSideSuspense>
          </RoomProvider>
        </LiveblocksProvider>
      }
    </section>
  </main >)
}