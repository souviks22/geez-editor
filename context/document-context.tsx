"use client"
import { createContext, useState } from "react"
import { CollabOptions, CollabDoc, CollabRole } from "@/plugins/slate-collab"

export type DocDetails = {
  changeDocHandler: (docId: string, editorId: string) => void
  changeRoleHandler: (role: CollabRole) => void
} & CollabOptions

export const docContext = createContext<DocDetails>({
  docId: '',
  editorId: '',
  role: 'viewer',
  changeDocHandler: () => { },
  changeRoleHandler: () => { }
})

export default function DocProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [doc, setDoc] = useState<CollabDoc>({ docId: '', editorId: '' })
  const [role, setRole] = useState<CollabRole>('viewer')
  const { Provider } = docContext
  const changeDocHandler = (docId: string, editorId: string) => setDoc({ docId, editorId })
  const changeRoleHandler = (role: CollabRole) => setRole(role)

  return (<Provider value={{
    docId: doc.docId,
    editorId: doc.editorId,
    role,
    changeDocHandler,
    changeRoleHandler
  }}>
    {children}
  </Provider>)
}