import { FunctionComponent } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core'
import { Entry, EntryFields } from 'contentful'
import { ContentfulRichText } from './rich-text'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    xl: { [theme.breakpoints.down('xl')]: { display: 'none' } },
    lg: { [theme.breakpoints.down('lg')]: { display: 'none' } },
    md: { [theme.breakpoints.down('md')]: { display: 'none' } },
    sm: { [theme.breakpoints.down('sm')]: { display: 'none' } }
  }))

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
    const classes = useStyles()
    const className = classes[entry.fields.hideBelow]

    return (
      <div className={className}>
        <ContentfulRichText content={entry.fields.content} />
      </div>
    )
  }