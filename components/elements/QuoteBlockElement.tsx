import { RenderElementProps } from "slate-react"

export default function QuoteBlockElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  return (<blockquote {...attributes}
    style={{
      display: 'flex',
      textAlign: element.align || 'left',
      padding: '1rem',
      borderRadius: '5px',
      borderColor: element.borderColor || 'transparent',
      borderWidth: (element.borderWidth || 0) + 'px',
      marginBlock: (element.spacing || 0.5) + 'rem',
      backgroundColor: element.backgroudColor || '#ededed',
    }}
  >
    <q>{children}</q>
  </blockquote>)
}