"use client"
import { useContext } from "react"
import { errorContext } from "@/context/error-context"
import { MdError } from "react-icons/md"

export default function Error() {
    const { message, toggleFallback } = useContext(errorContext)
    return (message && <section className='absolute w-full h-screen top-0 left-0 flex justify-center items-center'>
        <div className='w-1/3 bg-gray-200 flex flex-col items-center space-y-3 p-5 rounded-lg'>
            <span className='text-red-400'>
                <MdError size={60} />
            </span>
            <p className='pb-5'>{message}</p>
            <button className='bg-white text-sm hover:bg-aqua-green w-20 p-2 rounded' onClick={() => toggleFallback()}>Ok</button>
        </div>
    </section>)
}