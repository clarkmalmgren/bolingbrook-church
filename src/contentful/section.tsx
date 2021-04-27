import React, { FunctionComponent, useState, useEffect } from 'react'
import { Entry, EntryFields } from 'contentful'
import Box from '../components/box'
import { CardList } from '../components/card-list'
import { CardData, LatestSermonCardData, ContentfulCard } from './card'
import { ContentfulRichText } from './rich-text'
import { Loading } from '../components/loading'
import { client } from '../services/contentful'
import { GraphicSectionData, GraphicSection } from './graphic-section'
import { IFrame, IFrameData } from './iframe'

export interface CardSectionData {
  name: string
  cards: Entry<CardData | LatestSermonCardData>[]
}

export interface ContentSectionData {
  name: string
  content: EntryFields.RichText
  alignment?: 'left' | 'center' | 'right'
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

type Props = {
  entry?: Entry<SectionData>
  name?: string
  type?: 'cardSection' | 'contentSection'
}

export const ContentfulSection: FunctionComponent<Props> =
  ({ entry: initialEntry, name, type }) => {
    const [entry, setEntry] = useState(initialEntry)
    useEffect(() => {
      if (type && name && !entry) {
        client
          .getEntries<SectionData>({ content_type: type, 'fields.name': name })
          .then(c => setEntry(c.items[0]))
      }
    }, [name, type, entry])

    if (entry && isCards(entry)) {
      return (
        <CardList key={entry.sys.id}>
          { entry.fields.cards.map(c => (<ContentfulCard key={c.sys.id} entry={c} />)) }
        </CardList>
      )
    } else if (entry && isContent(entry)) {
      const alignment = entry.fields.alignment || 'left'
      return (
        <Box variant="section">
          <div style={{ textAlign: alignment }}>
          <ContentfulRichText content={entry.fields.content} />
          </div>
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
