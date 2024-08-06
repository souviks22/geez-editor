import { RenderElementProps } from "slate-react"

export default function ListItemElement({ attributes, children, element }: Readonly<RenderElementProps>) {
  return (<li {...attributes}
    style={{
      textAlign: element.align || 'left',
      borderColor: element.borderColor || 'transparent',
      borderWidth: (element.borderWidth || 0) + 'px',
      backgroundColor: element.backgroudColor || 'transparent',
      marginBottom: (element.spacing || 1) + 'rem'
    }}
  >
    {children}
  </li>)
}