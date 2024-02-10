import { Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Banner } from '../components/banner'
import { Loading } from '../components/loading'
import { SermonHeroCard } from '../components/sermon-hero-card'
import { ContentfulCard } from '../contentful/card'
import { EmbeddedEntry } from '../contentful/embedded'
import { ContentfulHero } from '../contentful/hero'
import { Lyrics } from '../contentful/lyrics'
import { ContentfulPage } from '../contentful/page'
import { ResponsiveContent } from '../contentful/responsive-content'
import { ContentfulSection } from '../contentful/section'
import { Unknown } from '../contentful/unknown'
import { useEntry } from '../services/contentful'

export const Preview: FunctionComponent<{}> =
  () => {
    const { id } = useParams()
    const { entry } = useEntry<any>(id || '')
    const failed = undefined // TODO: add this back in eventually

    if (!id) {
      return <Typography variant="h1">ID Required</Typography>
    } else if (failed) {
      return (
        <>
          <Typography variant="h3">Failed to download {id}</Typography>
          <pre>{JSON.stringify(failed, undefined, 2)}</pre>
        </>
      )
    } else if (!entry) {
      return <Loading />
    }
    
    switch (entry.sys.contentType.sys.id) {
      case 'card':              return <ContentfulCard entry={entry} />
      case 'hero':              return <ContentfulHero entry={entry} />
      case 'page':              return <ContentfulPage data={entry} path={entry.fields.path} />
      case 'responsiveContent': return <ResponsiveContent entry={entry} />
      case 'songLyrics':        return <Lyrics entry={entry} />
      case 'banner':            return <Banner forceOpen preloadedEntry={entry} />
      case 'latestSermonCard':  return <SermonHeroCard />

      case 'button':
      case 'youtubeVideo':
      case 'controlledImage':
        return <EmbeddedEntry id={entry.sys.id} />

      case 'cardSection':
      case 'contentSection':
      case 'graphicSection':
      case 'iframe':
        return <ContentfulSection entry={entry} />

      default:
        return <Unknown data={entry} />
    }
  }
