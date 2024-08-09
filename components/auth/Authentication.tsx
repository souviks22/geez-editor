import { useState } from "react"
import Image from "next/image"
import Provider from "./Provider"

export default function Authentication() {
  const [loading, setLoading] = useState<boolean>(false)
  const startLoadingHandler = () => setLoading(true)
  const stopPropagationHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
  }
  return (<div className='bg-slate-50 relative text-center shadow rounded-2xl px-20 pb-10 overflow-hidden' onClick={stopPropagationHandler}>
    {loading && <div className='block absolute left-0 bg-blue-600 z-20 h-1 animate-loading-bar transition-all' />}
    <section className='w-full flex justify-center items-center'>
      <Image
        src={'/geez-logo.png'}
        alt='Geez'
        width={150}
        height={150}
      />
    </section>
    <p className='text-3xl p-3 mb-5'>Welcome to Geez</p>
    <p className='text-lg p-2 mb-10'>Please confirm your identity before proceeding</p>
    <section className='space-y-5'>
      <Provider name='Google' icon='/google-logo.png' onClick={startLoadingHandler} />
      <Provider name='Github' icon='/github-logo.png' onClick={startLoadingHandler} />
    </section>
  </div>)
}