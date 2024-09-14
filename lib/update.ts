import { request } from "./api"
import { Document, CollabRole } from "@/types/model"

export const updateDocument = async ({ docId, update }: Readonly<{ docId: string, update: Partial<Document> }>) => {
  await request({
    url: `/documents/${docId}`,
    method: 'PUT',
    body: { update }
  })
}

export const grantPermission = async ({ docId, email, role }: Readonly<{ docId: string, email: string, role: CollabRole }>) => {
  await request({
    url: '/permissions/new-permission',
    method: 'POST',
    body: { docId, email, role }
  })
}