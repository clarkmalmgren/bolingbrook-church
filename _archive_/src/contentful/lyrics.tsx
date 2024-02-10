import { Typography } from '@mui/material'
import { Entry, EntryFields } from 'contentful'
import { FunctionComponent } from 'react'
import { ContentfulRichText } from './rich-text'

export type LyricsData = {
  title: string
  lyrics: EntryFields.RichText
}

type Props = {
  entry: Entry<LyricsData>
}

export const Lyrics: FunctionComponent<Props> =
  ({entry}) => (
    <div>
      <Typography variant="h3">{entry.fields.title}</Typography>
      <ContentfulRichText sx={{ whiteSpace: 'pre' }} content={entry.fields.lyrics} />
    </div>
  )
