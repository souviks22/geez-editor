import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useError } from "@/hooks/use-error"
import { Document, User } from "@/types/model"
import { request } from "@/lib/api"
import { convert, VIEW_LIMIT } from "@/lib/utility"
import Image from "next/image"

export default function MyDocument({ document }: Readonly<{ document: Document }>) {
  const router = useRouter()
  const { catchError } = useError()
  const [owners, setOwners] = useState<User[]>([])
  const [cycles, setCycles] = useState<number>(0)
  const [period, setPeriod] = useState<string>()
  const updation = new Date(document.updatedAt).getTime()
  const creation = new Date(document.createdAt).toDateString()
  const creationDate = creation.slice(4, 10), creationYear = creation.slice(11)

  useEffect(() => {
    catchError(async () => {
      const { data } = await request({ url: `/permissions/documents/${document._id}?role=owner` })
      const owners = data.users as User[]
      setOwners(owners)
    })()
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setCycles(cycles => cycles + 1)
    }, 15000)
    return () => clearInterval(id)
  }, [])
  
  useEffect(() => {
    const current = new Date().getTime()
    const diff = current - updation
    setPeriod(convert(diff))
  }, [cycles])

  return (<aside
    className='w-full flex flex-row-reverse lg:flex-row justify-between lg:justify-start items-center cursor-pointer pb-5 hover:scale-105 transition-transform border-b border-crystal-blue'
    onClick={() => router.push(`documents/${document._id}`)}
  >
    <div className='h-24 lg:h-36 w-20 lg:w-28 flex bg-slate-50 text-center text-sm justify-center items-center shadow-md p-2 hover:scale-105'>
      {document.title}
    </div>
    <section className='text-sm lg:px-20'>
      <div className='flex items-center ml-2 py-2'>
        {owners.slice(0, Math.min(owners.length, VIEW_LIMIT)).map((owner, i) =>
          <Image
            key={i}
            src={owner.image}
            alt={owner.email}
            height={30}
            width={30}
            className='-ml-2 rounded-full'
          />
        )}
        {owners.length > VIEW_LIMIT &&
          <span className='px-2'>
            + {owners.length - VIEW_LIMIT} other{owners.length - VIEW_LIMIT > 1 ? 's' : ''}
          </span>
        }
      </div>
      <div className='text-lg'>{document.title}</div>
      <div className='lg:text-base lg:pb-3'>Owned by {owners.map(owner => owner.name).join(', ')}</div>
      <div>Last updated {period} ago</div>
      <div>Created on {`${creationDate}, ${creationYear}`}</div>
    </section>
  </aside>)
}