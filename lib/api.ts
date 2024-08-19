import { getSession } from "next-auth/react"

type APIResponse = { message: string, data: any }
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const api = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_DOMAIN : 'http://localhost:5000'

export const request = async ({ url, method = 'GET', body }: Readonly<{ url: string, method?: HTTPMethod, body?: {} }>) => {
  const session = await getSession()
  const response = await fetch(`${api}${url}`, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.token}`
    }
  })
  const { success, message, data } = await response.json()
  if (!success) throw new Error(message)
  return { message, data } as APIResponse
}