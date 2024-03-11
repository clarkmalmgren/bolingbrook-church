import { ContentOf } from '@/services/ContentService'
import { OutputBlockData, OutputData } from '@editorjs/editorjs'
import { Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { MarkedText } from './MarkedText'

type ParagraphBlock = OutputBlockData<'paragraph', { text: string }>
type HeaderBlock = OutputBlockData<'header', { text: string, level: number }>

type RichBlockProvider = (block: OutputBlockData<any, any>) => JSX.Element

const Providers: { [type: string]: RichBlockProvider } = {
  paragraph: (b: ParagraphBlock) => (<Typography><MarkedText text={b.data.text} /></Typography>),
  header: (b: HeaderBlock) => (<Typography variant={`h${b.data.level}` as any}><MarkedText text={b.data.text} /></Typography>)
}

export type RichBlockProps = {
  block: OutputBlockData
}

export const RichBlock: FunctionComponent<RichBlockProps> =
  ({ block }) => Providers[block.type](block)

export type RichTextProps = {
  data?: OutputData
}

export const RichText: FunctionComponent<RichTextProps> =
  ({ data }) => (<>{ data?.blocks.map(b => <RichBlock key={b.id} block={b} />) }</>)

export type RichTextContentProps = ContentOf<RichTextProps>

export const RichTextContent: FunctionComponent<RichTextContentProps> =
  ({ data }) => (<RichText data={data} />)
