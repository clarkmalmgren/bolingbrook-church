import { Entry } from 'contentful'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { Loading } from '../components/loading'
import { client } from '../services/contentful'
import { ContentfulHero, HeroData } from './hero'
import { CardSectionData, ContentfulSection, ContentSectionData } from './section'
import { Typography } from '@material-ui/core'
import { useLocation } from 'react-router'
import Box from '../components/box'

interface PageData {
  name: string
  path: string
  hero: Entry<HeroData>
  sections: Entry<CardSectionData | ContentSectionData>[]
}

interface ContentfulPageProps {
  path?: string
  data?: Entry<PageData>
}

export const ContentfulPage: FunctionComponent<ContentfulPageProps> =
  (props) => {
    const [data, setData] = useState(props.data)
    const [initialized, setInitialized] = useState(false)
    const locationPath = useLocation().pathname

    useEffect(() => {
      if (!initialized && !data) {
        client
          .getEntries<PageData>({ content_type: 'page', 'fields.path': (props.path || locationPath ) })
          .then(collection => {
            setData(collection.items[0])
            setInitialized(true)
          })
      }
    })

    if (data) {
      return (
        <div key={data.sys.id}>
          <ContentfulHero entry={data.fields.hero} />
          { data.fields.sections.map(s => { return (<ContentfulSection key={s.sys.id} entry={s} />) }) }
        </div>
      )
    } else if (!initialized) {
      return (
        <Loading key={props.path} />
      )
    } else {
      return (
        <Box variant="section">
          <Typography variant="h1">Oops! That page can’t be found.</Typography>
          <Typography>
            It looks like nothing was found at this location. Maybe try one of the links from the menu.
            Let's take this as a moment to reflect that this error and all errors in our lives are forgiven,
            paid for, and covered by the grace of Our Lord, Jesus Christ.
          </Typography>
        </Box>
      )
    }
  }
