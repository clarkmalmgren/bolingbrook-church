import { Typography } from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Loading } from '../components/loading'
import { ContentfulCard } from '../contentful/card'
import { ContentfulSection } from '../contentful/section'
import { ContentfulHero } from '../contentful/hero'
import { ContentfulPage } from '../contentful/page'
import { ResponsiveContent } from '../contentful/responsive-content'
import { Unknown } from '../contentful/unknown'
import { useContentfulClient } from '../services/contentful'
import { Lyrics } from '../contentful/lyrics'

export const Preview: FunctionComponent<{}> =
  () => {
    const { id } = useParams()
    const [ data, setData ] = useState<any>(undefined)
    const [ failed, setFailed ] = useState<any>(undefined)
    const client = useContentfulClient()

    useEffect(() => {
      id && client.getEntry(id).then(setData, setFailed)
    }, [ id, client ])

    if (!id) {
      return <Typography variant="h1">ID Required</Typography>
    } else if (failed) {
      return (
        <>
          <Typography variant="h3">Failed to download {id}</Typography>
          <pre>{JSON.stringify(failed, undefined, 2)}</pre>
        </>
      )
    } else if (!data) {
      return <Loading />
    }
    
    switch (data.sys.contentType.sys.id) {
      case 'card':              return <ContentfulCard entry={data} />
      case 'hero':              return <ContentfulHero entry={data} />
      case 'page':              return <ContentfulPage data={data} path={data.fields.path} />
      case 'responsiveContent': return <ResponsiveContent entry={data} />
      case 'songLyrics':        return <Lyrics entry={data} />

      case 'cardSection':
      case 'contentSection':
      case 'graphicSection':
      case 'iframe':
        return <ContentfulSection entry={data} />

      default:
        return <Unknown data={data} />
    }
  }
