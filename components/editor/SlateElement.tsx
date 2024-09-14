import { RenderElementProps } from "slate-react"

import QuoteBlockElement from "../elements/QuoteBlockElement"
import BulltedListElement from "../elements/BulletedListElement"
import NumberedListElement from "../elements/NumberedListElement"
import ListItemElement from "../elements/ListItemElement"
import HeadingElement from "../elements/HeadingElement"
import ImageElement from "../elements/ImageElement"
import LinkElement from "../elements/LinkElement"
import ParagraphElement from "../elements/ParagraphElement"
import InlineElement from "../elements/InlineElement"
import TableElement from "../elements/TableElement"
import TableRowElement from "../elements/TableRowElement"
import TableHeaderElement from "../elements/TableHeaderElement"
import TableCellElement from "../elements/TableCellElement"

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