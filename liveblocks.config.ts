import { request } from "./lib/api"

export const authEndpoint = async (room?: string) => {
    const [docId, _editorid, role] = room?.split(':') || []
    const response = await request({
        url: '/collab/liveblocks-auth',
        method: 'POST',
        body: { docId, role, room },
        filtered: false
    })
    return response
}