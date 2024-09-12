import { getSession } from "next-auth/react"

type APIResponse = { message: string, data: any }
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const api = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_BACKEND_DOMAIN : 'http://localhost:4000'

export const request = async ({ url, method = 'GET', body, filtered = true }: Readonly<{ url: string, method?: HTTPMethod, body?: {}, filtered?: boolean }>) => {
  const session = await getSession()
  const response = await fetch(`${api}${url}`, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.token}`
    }
  })
  const rest = await response.json()
  if (!filtered) return rest
  const { success, message, data } = rest
  if (!success) throw new Error(message)
  return { message, data } as APIResponse
}