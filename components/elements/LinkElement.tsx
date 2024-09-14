import { RenderElementProps } from "slate-react"
import { LinkElement as LinkSlateElement } from "@/types/slate"

export default function LinkElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  const { url } = element as LinkSlateElement
  return (<a {...attributes}
    href={url}
    style={{
      textAlign: element.align || 'left',
      backgroundColor: element.backgroudColor || 'transparent',
    }}
  >
    {children}
  </a>)
}