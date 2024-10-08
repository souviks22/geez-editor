import { useState, useEffect } from "react"
import { LiveblocksYjsProvider } from "@liveblocks/yjs"
import { useRoom } from "@liveblocks/react"
import { Document, CollabRole } from "@/types/model"

import * as Y from "yjs"
import SlateEditor from "./SlateEditor"
import Loading from "../ui/Loading"

export default function CollabEditor({ document, role, onRefetch }: Readonly<{
    document: Document, role: CollabRole, onRefetch: () => void
}>) {
    const room = useRoom()
    const [connected, setConnected] = useState<boolean>(false)
    const [sharedType, setSharedType] = useState<Y.XmlText>()
    const [provider, setProvider] = useState<LiveblocksYjsProvider>()

    useEffect(() => {
        const yDoc = new Y.Doc()
        const yProvider = new LiveblocksYjsProvider(room, yDoc)
        const sharedDoc = yDoc.get('slate', Y.XmlText)
        yProvider?.on('sync', setConnected)
        setSharedType(sharedDoc)
        setProvider(yProvider)
        return () => {
            yDoc?.destroy()
            yProvider?.off('sync', setConnected)
            yProvider?.destroy()
        }
    }, [room])

    return (connected && sharedType && provider ?
        <SlateEditor
            sharedType={sharedType}
            provider={provider}
            document={document}
            role={role}
            onRefetch={onRefetch}
        />
        :
        <Loading />
    )
}