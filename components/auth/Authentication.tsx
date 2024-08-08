import Image from "next/image"
import Provider from "./Provider"

export default function Authentication() {
  const stopPropagationHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
  }
  return (<div className='bg-slate-50 text-center shadow rounded-2xl px-20 pb-10' onClick={stopPropagationHandler}>
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
      <Provider name='Google' icon='/google-logo.png' />
      <Provider name='Github' icon='/github-logo.png' />
    </section>
  </div>)
}