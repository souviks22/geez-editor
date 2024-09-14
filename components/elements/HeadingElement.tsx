import { CSSProperties } from "react"
import { RenderElementProps } from "slate-react"

export default function HeadingElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  const style: CSSProperties = {
    textAlign: element.align || 'left',
    borderColor: element.borderColor || 'transparent',
    borderWidth: (element.borderWidth || 0) + 'px',
    marginBottom: (element.spacing || 0.5) + 'rem',
    backgroundColor: element.backgroudColor || 'transparent'
  }
  return (<h1 {...attributes} style={style}>{children}</h1>)
}