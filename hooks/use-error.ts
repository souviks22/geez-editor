"use client"
import { useContext } from "react"
import { errorContext } from "@/context/error-context"

export const useError = () => {
    const { toggleFallback } = useContext(errorContext)
    const catchError = (callback: (event?: any) => Promise<void>, onError?: () => void) => {
        return (event?: any) => {
            callback(event).catch(error => {
                toggleFallback(error.message)
                if (onError) onError()
            })
        }
    }
    return { catchError }
}