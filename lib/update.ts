import { request } from "./api"
import { Document } from "@/types/model"

export const updateDocument = async ({ docId, update }: Readonly<{ docId: string, update: Partial<Document> }>) => {
	await request({
		url: `/documents/${docId}`,
		method: 'PUT',
		body: { update }
	})
}