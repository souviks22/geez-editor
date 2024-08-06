import { RenderElementProps } from "slate-react"

export default function TableCellElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  return (<td {...attributes}
    style={{
      textAlign: element.align || 'left',
      borderColor: element.borderColor || 'black',
      borderWidth: (element.borderWidth || 2) + 'px',
      backgroundColor: element.backgroudColor || 'Trasparent'
    }}
  >
    {children}
  </td>)
}