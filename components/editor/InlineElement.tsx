import { RenderElementProps } from "slate-react"

export default function InlineElement({ attributes, children }: Readonly<RenderElementProps>) {
  return (<span {...attributes}>
    {children}
  </span>)
}