import React, { FunctionComponent, useState, useEffect } from 'react'
import { Entry, EntryFields } from 'contentful'
import Box from '../components/box'
import CardList from '../components/card-list'
import { CardData, LatestSermonCardData, ContentfulCard } from './card'
import { ContentfulRichText } from './rich-text'
import { Loading } from '../components/loading'
import { client } from '../services/contentful'

export interface CardSectionData {
  name: string
  cards: Entry<CardData | LatestSermonCardData>[]
}

export interface ContentSectionData {
  name: string
  content: EntryFields.RichText
}

type SectionData = CardSectionData | ContentSectionData

function isCards(entry: Entry<SectionData>): entry is Entry<CardSectionData> {
  return (entry as Entry<CardSectionData>).fields.cards !== undefined
}

function isContent(entry: Entry<SectionData>): entry is Entry<ContentSectionData> {
  return (entry as Entry<ContentSectionData>).fields.content !== undefined
}

interface Props {
  entry?: Entry<SectionData>
  name?: string
  type?: 'cardSection' | 'contentSection'
}

export const ContentfulSection: FunctionComponent<Props> =
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
        <Box variant='wide-section'>
          <CardList key={entry.sys.id}>
            { entry.fields.cards.map(c => (<ContentfulCard key={c.sys.id} entry={c} />)) }
          </CardList>
        </Box>
      )
    } else if (entry && isContent(entry)) {
      return (
        <Box variant='section'>
          <ContentfulRichText content={entry.fields.content} />
        </Box>
      )
    } else {
      return (<Loading />)
    }
  }
