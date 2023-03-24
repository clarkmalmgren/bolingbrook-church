import { useMediaQuery, useTheme } from '@mui/material'
import { Entry, EntryFields } from 'contentful'
import { FunctionComponent } from 'react'
import { ContentfulRichText } from './rich-text'

export type ResponsiveContentData = {
  name: string
  hideBelow: 'sm' | 'md' | 'lg' | 'xl'
  content: EntryFields.RichText
}

export type Props = {
  entry: Entry<ResponsiveContentData>
}

export const ResponsiveContent: FunctionComponent<Props> =
  ({ entry }) => {
    const theme = useTheme()
    const query = useMediaQuery(theme.breakpoints.down(entry.fields.hideBelow))
    return query ? null : (<ContentfulRichText content={entry.fields.content} />)
  }
