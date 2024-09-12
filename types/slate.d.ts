import { BaseEditor, BaseElement } from "slate"
import { ReactEditor } from "slate-react"
import { HistoryEditor } from "slate-history"
import { StyleEditor } from "@/plugins/slate-style"
import { CommandEditor } from "@/plugins/slate-command"
import { HotkeyEditor } from "@/plugins/slate-hotkey"
import { YjsEditor } from "@slate-yjs/core"

export type CustomText = {
  text: string,
  bold?: boolean,
  italic?: boolean,
  underline?: boolean,
  code?: boolean,
  color?: string,
  backgroundColor?: string,
  fontSize?: number,
  fontStyle?: string,
  script?: 'sub' | 'super',
}

export type CommonElement = {
  align?: 'left' | 'center' | 'right' | 'justify',
  spacing?: number,
  backgroudColor?: string,
  borderWidth?: number,
  borderColor?: string
} & BaseElement

export type ParagraphElement = { type?: 'paragraph' } & CommonElement

export type InlineElement = { type?: 'inline' } & CommonElement

export type QuoteBlockElement = { type?: 'quote-block' } & CommonElement

export type BulletedListElement = { type?: 'bulleted-list' } & CommonElement

export type NumberedListElement = { type?: 'numbered-list' } & CommonElement

export type ListItemElement = { type?: 'list-item' } & CommonElement

export type HeadingElement = { type?: 'heading' } & CommonElement

export type ImageElement = { type?: 'image', url: string } & CommonElement

export type LinkElement = { type?: 'link', url: string } & CommonElement

export type TableElement = { type?: 'table' } & CommonElement

export type TableRowElement = { type?: 'table-row' } & CommonElement

export type TableHeaderElement = { type?: 'table-header' } & CommonElement

export type TableCellElement = { type?: 'table-cell' } & CommonElement

export type CodeBlockElement = { type?: 'code-block', language: string } & CommonElement

export type CodeLineElement = { type?: 'code-line' } & CommonElement

export type CustomElement =
  | ParagraphElement
  | InlineElement
  | QuoteBlockElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement
  | HeadingElement
  | ImageElement
  | LinkElement
  | TableElement
  | TableRowElement
  | TableHeaderElement
  | TableCellElement
  | CodeBlockElement
  | CodeLineElement

export type CustomEditor =
  & BaseEditor
  & ReactEditor
  & HistoryEditor
  & StyleEditor
  & CommandEditor
  & HotkeyEditor
  & YjsEditor

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}