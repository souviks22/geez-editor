import { RenderElementProps } from "slate-react"

export default function NumberedListElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  return (<ol {...attributes}
    style={{
      listStyle: '-moz-initial',
      textAlign: element.align || 'left',
      paddingInline: '1rem',
      borderColor: element.borderColor || 'transparent',
      borderWidth: (element.borderWidth || 0) + 'px',
      marginBlock: (element.spacing || 1) + 'rem',
      backgroundColor: element.backgroudColor || 'transparent'
    }}
  >
    {children}
  </ol>)
}