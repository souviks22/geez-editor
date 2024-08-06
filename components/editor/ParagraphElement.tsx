import { RenderElementProps } from "slate-react"

export default function ParagraphElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  return (<p {...attributes}
    style={{
      textAlign: element.align || 'left',
      borderColor: element.borderColor || 'transparent',
      borderWidth: (element.borderWidth || 0) + 'px',
      marginBlock: (element.spacing || 1) + 'rem',
      backgroundColor: element.backgroudColor || 'transparent'
    }}
  >
    {children}
  </p>)
}