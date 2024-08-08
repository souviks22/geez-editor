type APIResponse = { message: string, data: any }
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

const api = process.env.BACKEND_DOMAIN

export const request = async ({ url, method = 'GET', body }: Readonly<{ url: string, method?: HTTPMethod, body?: {} }>) => {
  const response = await fetch(`${api}${url}`, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: { 'Content-Type': 'application/json' }
  })
  const { success, message, data } = await response.json()
  if (!success) throw new Error(message)
  return { message, data } as APIResponse
}