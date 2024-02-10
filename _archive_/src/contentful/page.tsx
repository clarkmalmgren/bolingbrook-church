import { Typography } from '@mui/material'
import { Entry } from 'contentful'
import { FunctionComponent } from 'react'
import { useLocation } from 'react-router-dom'
import { BCBox } from '../components/box'
import { Loading } from '../components/loading'
import { useQueryOne } from '../services/contentful'
import { ContentfulHero, HeroData } from './hero'
import { CardSectionData, ContentSectionData, ContentfulSection } from './section'

export type PageData = {
  name: string
  path: string
  hero: Entry<HeroData>
  sections: Entry<CardSectionData | ContentSectionData>[]
}

type ContentfulPageProps = {
  path?: string
  data?: Entry<PageData>
}

export const ContentfulPage: FunctionComponent<ContentfulPageProps> =
  ({ path, data: init }) => {
    const locationPath = useLocation().pathname
    const { entry, initialized } =
      useQueryOne(
        { content_type: 'page', 'fields.path': (path || locationPath ) },
        init
      )

    if (entry) {
      return (
        <div key={entry.sys.id}>
          <ContentfulHero entry={entry.fields.hero} />
          { entry.fields.sections.map(s => { return (
            <ContentfulSection key={s.sys.id} entry={s} />
          ) }) }
        </div>
      )
    } else if (!initialized) {
      return (
        <Loading key={path} />
      )
    } else {
      return (
        <BCBox variant="section">
          <Typography variant="h1">Oops! That page can’t be found.</Typography>
          <Typography>
            It looks like nothing was found at this location. Maybe try one of the links from the menu.
            Let's take this as a moment to reflect that this error and all errors in our lives are forgiven,
            paid for, and covered by the grace of Our Lord, Jesus Christ.
          </Typography>
        </BCBox>
      )
    }
  }
