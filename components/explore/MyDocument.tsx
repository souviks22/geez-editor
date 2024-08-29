import { useState, useEffect } from "react"
import { Document, User } from "@/types/model"
import { request } from "@/lib/api"

export default function MyDocument({ document, onClick }: Readonly<{ document: Document, onClick: (document: Document) => void }>) {
  const [owners, setOwners] = useState<User[]>([])
  const [cycles, setCycles] = useState<number>(0)
  const [period, setPeriod] = useState<string>()
  const updation = new Date(document.updatedAt).getTime()
  const creation = new Date(document.createdAt).toDateString()
  const creationDate = creation.slice(4, 10), creationYear = creation.slice(11)

  useEffect(() => {
    (async () => {
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
    className='w-full flex items-center cursor-pointer p-2 transition-transform hover:scale-105 border-b border-crystal-blue'
    onClick={() => onClick(document)}
  >
    <div className='h-36 w-28 flex text-xs text-center items-center shadow-md p-2'>
      {document.title}
    </div>
    <section className='text-sm px-20'>
      <div>Authored by {owners.map(owner => owner.name).join(', ')}</div>
      <div>Last updated {period} ago</div>
      <div>Created on {`${creationDate}, ${creationYear}`}</div>
    </section>
  </aside>)
}

const convert = (diff: number) => {
  const periods = ['year', 'month', 'day', 'hour', 'minute', 'second']
  let period = 0, i = 0
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(months / 12)
  for (const cur of [years, months, days, hours, minutes, seconds]) {
    period = cur
    if (cur) break
    i += 1
  }
  return `${period} ${periods[i]}${period > 1 ? 's' : ''}`
}