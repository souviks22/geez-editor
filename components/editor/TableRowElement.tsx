import { RenderElementProps } from "slate-react"

export default function TableRowElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  return (<tr {...attributes}
    style={{
      textAlign: element.align || 'left',
      padding: (element.spacing || 1) + 'rem',
      borderColor: element.borderColor || 'black',
      borderWidth: (element.borderWidth || 2) + 'px',
      backgroundColor: element.backgroudColor || 'Trasparent'
    }}
  >
    {children}
  </tr>)
}