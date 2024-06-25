const api = process.env.BACKEND_DOMAIN

type ApiResponse = { message: string, data: object | undefined }
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type RequestBody = object | null

export const apiRequest = async (url: string, method: HttpMethod, body: RequestBody = null) => {
  const response = await fetch(`${api}${url}`, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: { 'Content-Type': 'application/json' }
  })
  const { success, message, data } = await response.json()
  if (!success) throw new Error(message)
  const apiResponse: ApiResponse = { message, data }
  return apiResponse
}