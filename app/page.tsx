"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    const redirect = localStorage.getItem(process.env.NEXT_PUBLIC_REDIRECT_KEY as string)
    localStorage.removeItem(process.env.NEXT_PUBLIC_REDIRECT_KEY as string)
    if (redirect) router.replace(redirect)
  }, [])
  return (<main className='flex justify-evenly items-center min-h-screen bg-gradient-home from-aqua-green from-20% to-crystal-blue backdrop-blur'>
    <div className='text-center'>
      <div className='mb-10'>
        <h1 className='text-9xl mb-10'>Geez</h1>
        <section>
          <p className='text-sm'>A real-time collaboration tool</p>
          <p className='text-sm'>Create documents and share with your team</p>
        </section>
      </div>
      <Link
        href={'/explore'}
        className='bg-sky-50 hover:bg-sky-100 text-lg cursor-pointer px-10 py-3 shadow rounded-xl'>
        Get Started
      </Link>
    </div>
    <div>
      <Image
        src={'/geez-logo.png'}
        alt='Geez'
        width={500}
        height={500}
      />
    </div>
  </main>)
}