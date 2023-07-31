import { Asset, Entry, EntryFields } from 'contentful'
import { FunctionComponent } from 'react'
import { Card } from '../components/card'
import { SermonHeroCard } from '../components/sermon-hero-card'
import { ContentfulRichText } from './rich-text'

export interface CardData {
  title: string
  subtitle: string
  media: Asset
  content: EntryFields.RichText
  link?: string
}

export interface LatestSermonCardData {
  name: string
}

function isLatestSermon(data: CardData | LatestSermonCardData): data is LatestSermonCardData {
  return (data as LatestSermonCardData).name !== undefined
}

interface Props {
  entry: Entry<CardData | LatestSermonCardData>
}

export const ContentfulCard: FunctionComponent<Props> =
  ({ entry }) => {
    const data = entry.fields
    
    if (!data) {
      return (<Card key={entry.sys.id} title="" />)
    } else if (isLatestSermon(data)) {
      return (<SermonHeroCard key={data.name} />)
    } else {
      return (
        <Card key={entry.sys.id} title={data.title} subtitle={data.subtitle} media={data.media} link={data.link}>
          <ContentfulRichText content={data.content} />
        </Card>
      )
    }
  }
