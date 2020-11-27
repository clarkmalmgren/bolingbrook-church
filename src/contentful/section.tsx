import React, { FunctionComponent, useState, useEffect } from 'react'
import { Entry, EntryFields } from 'contentful'
import Box from '../components/box'
import CardList from '../components/card-list'
import { CardData, LatestSermonCardData, ContentfulCard } from './card'
import { ContentfulRichText } from './rich-text'
import { Loading } from '../components/loading'
import { client } from '../services/contentful'
import { GraphicSectionData, GraphicSection } from './graphic-section'
import { IFrame, IFrameData } from './iframe'
import { createStyles, colors } from '@material-ui/core'
import { WithStyles, withStyles } from '@material-ui/styles'

const styles = createStyles({
  cardSection: {
    marginTop: '20px',
    padding: '20px',
    background: colors.grey[200]
  }
})

export interface CardSectionData {
  name: string
  cards: Entry<CardData | LatestSermonCardData>[]
}

export interface ContentSectionData {
  name: string
  content: EntryFields.RichText
}

type SectionData = CardSectionData | ContentSectionData | GraphicSectionData | IFrameData

function isCards(entry: Entry<SectionData>): entry is Entry<CardSectionData> {
  return entry.sys.contentType?.sys.id === 'cardSection'
}

function isContent(entry: Entry<SectionData>): entry is Entry<ContentSectionData> {
  return entry.sys.contentType?.sys.id === 'contentSection'
}

function isGraphic(entry: Entry<SectionData>): entry is Entry<GraphicSectionData> {
  return entry.sys.contentType?.sys.id === 'graphicSection'
}

function isIFrame(entry: Entry<SectionData>): entry is Entry<IFrameData> {
  return entry.sys.contentType?.sys.id === 'iframe'
}

interface Props extends WithStyles<typeof styles> {
  entry?: Entry<SectionData>
  name?: string
  type?: 'cardSection' | 'contentSection'
}

const UnstyledContentfulSection: FunctionComponent<Props> =
  (props) => {
    const [entry, setEntry] = useState(props.entry)
    useEffect(() => {
      if (props.type && props.name && !entry) {
        client
          .getEntries<SectionData>({ content_type: props.type, 'fields.name': props.name })
          .then(c => setEntry(c.items[0]))
      }
    }, [props.name, props.type, entry])

    if (entry && isCards(entry)) {
      return (
        <div className={props.classes.cardSection}>
          <CardList key={entry.sys.id}>
            { entry.fields.cards.map(c => (<ContentfulCard key={c.sys.id} entry={c} />)) }
          </CardList>
        </div>
      )
    } else if (entry && isContent(entry)) {
      return (
        <Box variant='section'>
          <ContentfulRichText content={entry.fields.content} />
        </Box>
      )
    } else if (entry && isGraphic(entry)) {
      return (<GraphicSection entry={entry} />)
    } else if (entry && isIFrame(entry)) {
      return (<IFrame key={entry.sys.id} entry={entry} />)
    } else {
      return (<Loading />)
    }
  }

export const ContentfulSection = withStyles(styles)(UnstyledContentfulSection)
