import { RenderLeafProps } from "slate-react"

export default function SlateLeaf({ attributes, children, leaf }: Readonly<RenderLeafProps>) {
  let formattedText: React.ReactNode = children

  if (leaf.bold) formattedText = <strong>{formattedText}</strong>
  if (leaf.italic) formattedText = <em>{formattedText}</em>
  if (leaf.underline) formattedText = <u>{formattedText}</u>
  if (leaf.code) formattedText = <code>{formattedText}</code>
  if (leaf.script === 'sub') formattedText = <sub>{formattedText}</sub>
  if (leaf.script === 'super') formattedText = <sup>{formattedText}</sup>

  return (<span {...attributes}
    style={{
      color: leaf.color || 'black',
      backgroundColor: leaf.backgroundColor || 'transparent',
      fontSize: leaf.fontSize ? leaf.fontSize + 'rem' : 'inherit',
      fontStyle: leaf.fontStyle || 'inherit',
      paddingBlock: '1rem'
    }}
  >
    {formattedText}
  </span>)
}