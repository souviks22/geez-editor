"use client"
import { createContext, useState } from "react"

export type ErrorFallback = {
  message?: string,
  toggleFallback: (message?: string) => void
}

export const errorContext = createContext<ErrorFallback>({
  message: '',
  toggleFallback: () => { }
})

export default function ErrorProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [message, setMessage] = useState<string>()
  const { Provider } = errorContext
  return (<Provider value={{
    message,
    toggleFallback: (message?: string) => {
      setMessage(message)
    }
  }}>
    {children}
  </Provider>)
}