import { RenderElementProps } from "slate-react"
import { ImageElement as ImageSlateElement } from "@/types/slate"

export default function ImageElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  const { url } = element as ImageSlateElement
  return (<div {...attributes}
    style={{
      display: 'flex',
      justifyContent: element.align || 'left',
      marginBlock: (element.spacing || 0.5) + 'rem'
    }}
  >
    <img src={url}
      style={{
        borderColor: element.borderColor || 'transparent',
        borderWidth: (element.borderWidth || 0) + 'px',
      }}
    >
      {children}
    </img>
  </div>)
}