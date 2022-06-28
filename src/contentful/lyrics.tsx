import { FunctionComponent } from 'react'
import { Entry, EntryFields } from 'contentful'
import { Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { ContentfulRichText } from './rich-text'

export interface LyricsData {
  title: string
  lyrics: EntryFields.RichText
}

const useStyles = makeStyles(() => createStyles({
  lyrics: {
    whiteSpace: 'pre'
  }
}))

type Props = {
  entry: Entry<LyricsData>
}

export const Lyrics: FunctionComponent<Props> =
  ({entry}) => {
    const classes = useStyles()
    return (
      <div>
        <Typography variant="h3">{entry.fields.title}</Typography>
        <ContentfulRichText className={classes.lyrics} content={entry.fields.lyrics} />
      </div>
    )
  }
