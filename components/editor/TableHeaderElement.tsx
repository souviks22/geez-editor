import { RenderElementProps } from "slate-react"

export default function TableHeaderElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  return (<th {...attributes}
    style={{
      textAlign: element.align || 'left',
      borderColor: element.borderColor || 'black',
      borderWidth: (element.borderWidth || 2) + 'px',
      backgroundColor: element.backgroudColor || 'Trasparent'
    }}
  >
    <strong>{children}</strong>
  </th>)
}