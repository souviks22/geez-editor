import { CursorOverlayData } from "@slate-yjs/react"
import { Cursor } from "@/types/model"

export default function Selection({ data, selectionRects, caretPosition }: CursorOverlayData<Cursor>) {
  return (<>
    {selectionRects.map((position, i) => (
      <div
        key={i}
        style={{ backgroundColor: data?.color, ...position }}
        className='absolute pointer-events-none opacity-20'
      />
    ))}
    {caretPosition && <div
      style={{ ...caretPosition, backgroundColor: data?.color }}
      className='absolute w-0.5'
    >
      <div
        style={{ backgroundColor: data?.color }}
        className='absolute text-xs text-white whitespace-nowrap top-0 rounded rounded-bl-none px-1.5 py-0.5 -translate-y-full'
      >
        {data?.name}
      </div>
    </div>}
  </>)
}