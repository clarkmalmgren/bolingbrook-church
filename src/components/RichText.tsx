import { ContentOf } from '@/services/models/Content'
import { OutputBlockData, OutputData } from '@editorjs/editorjs'
import { Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { MarkedText } from './MarkedText'
import { ComponentById } from './DynamicComponent'

type ParagraphBlock = OutputBlockData<'paragraph', { text: string }>
type HeaderBlock = OutputBlockData<'header', { text: string, level: number }>
type ChildBlock = OutputBlockData<'child', { ref?: string }>

type RichBlockProvider = (block: OutputBlockData<any, any>) => JSX.Element | null

const Providers: { [type: string]: RichBlockProvider } = {
  paragraph: (b: ParagraphBlock) => (<Typography><MarkedText text={b.data.text} /></Typography>),
  header: (b: HeaderBlock) => (<Typography variant={`h${b.data.level}` as any}><MarkedText text={b.data.text} /></Typography>),
  child: (c: ChildBlock) => (c.data.ref ? <ComponentById id={c.data.ref} /> : null)
}

export type RichBlockProps = {
  block: OutputBlockData
}

export const RichBlock: FunctionComponent<RichBlockProps> =
  ({ block }) => Providers[block.type]?.(block) || null

export type RichTextProps = {
  data?: OutputData
}

export const RichText: FunctionComponent<RichTextProps> =
  ({ data }) => (<>{ data?.blocks.map((b, i) => <RichBlock key={i} block={b} />) }</>)

export type RichTextContentProps = ContentOf<RichTextProps>

export const RichTextContent: FunctionComponent<RichTextContentProps> =
  ({ data }) => (<RichText data={data} />)
