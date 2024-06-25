"use server"
import { getSession } from "next-auth/react"

type ApiResponse = { message: string, data: any }
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'
type RequestBody = object | null

const api = process.env.BACKEND_DOMAIN

export const apiRequest = async (url: string, method: HttpMethod = 'GET', body: RequestBody = null) => {
  const session = await getSession()
  const response = await fetch(`${api}${url}`, {
    method,
    body: body ? JSON.stringify(body) : null,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.user.apiToken}`
    }
  })
  const { success, message, data } = await response.json()
  if (!success) throw new Error(message)
  const apiResponse: ApiResponse = { message, data }
  return apiResponse
}