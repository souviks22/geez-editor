"use client"
import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { RoomProvider } from "@liveblocks/react"
import { ClientSideSuspense } from "@liveblocks/react"
import { request } from "@/lib/api"
import { Document } from "@/types/model"
import { LiveblocksProvider } from "@liveblocks/react"
import { authEndpoint } from "@/liveblocks.config"

import CollabEditor, { CollabRole } from "@/components/editor/CollabEditor"
import Protect from "@/components/auth/Protect"

export default function Editor() {
  const { docId } = useParams()
  const [document, setDocument] = useState<Document>()
  const [role, setRole] = useState<CollabRole>('viewer')
  const roomId = `${docId}:${document?.content}:${role}`

  useEffect(() => {
    (async () => {
      const { data } = await request({ url: `/documents/${docId}` })
      setDocument(data.document as Document)
    })()
  }, [])

  return (<main className='flex relative min-h-screen flex-col items-center justify-between'>
    <Protect />
    <section className='flex justify-center bg-gradient-radial from-aqua-green via-sky-300 to-crystal-blue w-full p-5 my-20'>
      {document?.content &&
        <LiveblocksProvider authEndpoint={authEndpoint}>
          <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
            <ClientSideSuspense fallback={<div>Loading</div>}>
              <CollabEditor />
            </ClientSideSuspense>
          </RoomProvider>
        </LiveblocksProvider>
      }
    </section>
  </main>)
}