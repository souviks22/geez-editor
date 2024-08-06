import { RenderElementProps } from "slate-react"

import QuoteBlockElement from "./QuoteBlockElement"
import BulltedListElement from "./BulletedListElement"
import NumberedListElement from "./NumberedListElement"
import ListItemElement from "./ListItemElement"
import HeadingElement from "./HeadingElement"
import ImageElement from "./ImageElement"
import LinkElement from "./LinkElement"
import ParagraphElement from "./ParagraphElement"
import InlineElement from "./InlineElement"
import TableElement from "./TableElement"
import TableRowElement from "./TableRowElement"
import TableHeaderElement from "./TableHeaderElement"
import TableCellElement from "./TableCellElement"

export default function SlateElement(props: Readonly<RenderElementProps>) {
  switch (props.element.type) {
    case 'inline':
      return (<InlineElement {...props} />)
    case 'quote-block':
      return (<QuoteBlockElement {...props} />)
    case 'bulleted-list':
      return (<BulltedListElement {...props} />)
    case 'numbered-list':
      return (<NumberedListElement {...props} />)
    case 'list-item':
      return (<ListItemElement {...props} />)
    case 'heading':
      return (<HeadingElement {...props} />)
    case 'image':
      return (<ImageElement {...props} />)
    case 'link':
      return (<LinkElement {...props} />)
    case 'table':
      return (<TableElement {...props} />)
    case 'table-row':
      return (<TableRowElement {...props} />)
    case 'table-header':
      return (<TableHeaderElement {...props} />)
    case 'table-cell':
      return (<TableCellElement {...props} />)
    default:
      return (<ParagraphElement {...props} />)
  }
}