"use client"
import { createContext, useState } from "react"

export type AuthFallback = {
  active: boolean,
  toggleFallback: () => void
}

export const authContext = createContext<AuthFallback>({
  active: false,
  toggleFallback: () => { }
})

export default function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [active, setActive] = useState<boolean>(false)
  const { Provider } = authContext
  return (<Provider value={{
    active,
    toggleFallback: () => setActive(active => !active)
  }}>
    {children}
  </Provider>)
}