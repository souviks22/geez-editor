import { RenderElementProps } from "slate-react"

export default function TableElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  return (<table>
    <tbody {...attributes}
      style={{
        textAlign: element.align || 'left',
        borderColor: element.borderColor || 'black',
        borderWidth: (element.borderWidth || 2) + 'px',
        marginBlock: (element.spacing || 1) + 'rem',
        backgroundColor: element.backgroudColor || 'Trasparent'
      }}
    >
      {children}
    </tbody>
  </table>)
}