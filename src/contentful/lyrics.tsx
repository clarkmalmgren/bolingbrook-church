import React, { FunctionComponent } from 'react'
import { Entry, EntryFields } from 'contentful'
import { createStyles, withStyles, WithStyles, Typography } from '@material-ui/core'
import { ContentfulRichText } from './rich-text'

export interface LyricsData {
  title: string
  lyrics: EntryFields.RichText
}

const styles = createStyles({
  lyrics: {
    whiteSpace: 'pre'
  }
})

interface Props extends WithStyles<typeof styles> {
  entry: Entry<LyricsData>
}

const UnstyledLyrics: FunctionComponent<Props> =
  ({entry, classes}) => {
    return (
      <div>
        <Typography variant="h3">{entry.fields.title}</Typography>
        <ContentfulRichText className={classes.lyrics} content={entry.fields.lyrics} />
      </div>
    )
  }

export const Lyrics = withStyles(styles)(UnstyledLyrics)
