import React, { FunctionComponent, useState, useEffect } from 'react'
import { Entry, EntryFields } from 'contentful'
import { BCBox }from '../components/box'
import { CardList } from '../components/card-list'
import { CardData, LatestSermonCardData, ContentfulCard } from './card'
import { ContentfulRichText } from './rich-text'
import { Loading } from '../components/loading'
import { useContentfulClient } from '../services/contentful'
import { GraphicSectionData, GraphicSection } from './graphic-section'
import { IFrame, IFrameData } from './iframe'
import { Box, useTheme } from '@mui/material'

export type CardSectionData = {
  name: string
  cards: Entry<CardData | LatestSermonCardData>[]
}

export type ContentSectionData = {
  name: string
  content: EntryFields.RichText
  alignment?: 'left' | 'center' | 'right'
  theme?: 'black on white' | 'white on orange' | 'white on black'
  showWhiteMargins?: boolean
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
    const client = useContentfulClient()
    const theme = useTheme()
    
    useEffect(() => {
      if (type && name && !entry) {
        client
          .getEntries<SectionData>({ content_type: type, 'fields.name': name })
          .then(c => setEntry(c.items[0]))
      }
    }, [name, type, entry, client])

    if (entry && isCards(entry)) {
      return (
        <CardList key={entry.sys.id}>
          { entry.fields.cards.map(c => (<ContentfulCard key={c.sys.id} entry={c} />)) }
        </CardList>
      )
    } else if (entry && isContent(entry)) {
      const alignment = entry.fields.alignment || 'left'
      const textColor = entry.fields.theme?.match(/^white/) ? 'white' : undefined
      let bgColor: string | undefined = undefined
      if (entry.fields.theme?.match(/on white$/)) {
        bgColor = 'white'
      } else if (entry.fields.theme?.match(/on black$/)) {
        bgColor = 'black'
      } else  if (entry.fields.theme?.match(/on orange$/)) {
        bgColor = theme.palette.primary.main
      }

      return (
        <Box
          paddingTop="2px"
          paddingBottom="2px"
          color={textColor}
          bgcolor={entry.fields.showWhiteMargins ? undefined : bgColor}
        >
          <BCBox variant="section">
            <Box textAlign={alignment} bgcolor={bgColor} p={entry.fields.showWhiteMargins ? 2 : 0}>
              <ContentfulRichText content={entry.fields.content} />
            </Box>
          </BCBox>
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
