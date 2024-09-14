"use client"
import { useContext } from "react"
import { errorContext } from "@/context/error-context"

export const useError = () => {
    const { toggleFallback } = useContext(errorContext)
    const catchError = (callback: () => Promise<void>, onError?: () => void) => {
        return () => {
            callback().catch(error => {
                toggleFallback(error.message)
                if (onError) onError()
            })
        }
    }
    return { catchError }
}