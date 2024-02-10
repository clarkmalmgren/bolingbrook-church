import { Box, useTheme } from '@mui/material'
import { Entry, EntryFields } from 'contentful'
import { FunctionComponent } from 'react'
import { BCBox } from '../components/box'
import { CardList } from '../components/card-list'
import { Loading } from '../components/loading'
import { useQueryOne } from '../services/contentful'
import { CardData, ContentfulCard, LatestSermonCardData } from './card'
import { GraphicSection, GraphicSectionData } from './graphic-section'
import { IFrame, IFrameData } from './iframe'
import { ContentfulRichText } from './rich-text'

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
  type?: 'cardSection' | 'contentSection' | 'graphicSection'
}

export const ContentfulSection: FunctionComponent<Props> =
  ({ entry: init, name, type }) => {
    const theme = useTheme()
    const query = {
      content_type: type || init?.sys?.contentType?.sys?.id,
      'fields.name': name || init?.fields?.name
    }
    const { entry } = useQueryOne(query, init)

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
