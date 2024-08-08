import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (<main className='flex justify-evenly items-center min-h-screen'>
    <section className='absolute -z-10 w-full'>
      <Image
        src={'/home.svg'}
        alt='Home'
        width={100}
        height={100}
        layout='responsive'
      />
    </section>
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