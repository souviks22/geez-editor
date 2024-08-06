import { RenderElementProps } from "slate-react"

export default function BulltedListElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  return (<ul {...attributes}
    style={{
      listStyle: 'initial',
      textAlign: element.align || 'left',
      paddingInline: '1rem',
      borderColor: element.borderColor || 'transparent',
      borderWidth: (element.borderWidth || 0) + 'px',
      marginBlock: (element.spacing || 1) + 'rem',
      backgroundColor: element.backgroudColor || 'transparent'
    }}
  >
    {children}
  </ul>)
}