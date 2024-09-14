import { useRef } from "react"
import { useRemoteCursorOverlayPositions } from "@slate-yjs/react"
import { Cursor } from "@/types/model"
import Selection from "./Selection"

export default function Cursors({ children }: Readonly<{ children: React.ReactNode }>) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursors] = useRemoteCursorOverlayPositions<Cursor>({ containerRef })

  return (<div ref={containerRef} className='relative'>
    {children}
    {cursors.map(cursor => <Selection key={cursor.clientId} {...cursor} />)}
  </div>)
}