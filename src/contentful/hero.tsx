import { createStyles } from '@material-ui/core'
import { WithStyles, withStyles } from '@material-ui/styles'
import { Asset, Entry, EntryFields } from 'contentful'
import React, { FunctionComponent, useEffect, useState } from 'react'
import HeroComponent, { HeroMedia } from '../components/hero'
import { client } from '../services/contentful'
import { ContentfulRichText } from './rich-text'
import { Loading } from '../components/loading'

const styles = createStyles({
  content: {
    textAlign: 'center',
    color: 'white'
  }
})

export interface HeroData {
  name: string
  media: Asset[]
  content?: EntryFields.RichText
  height: number
  shade?: number
}

interface ContentfulHeroProps extends WithStyles<typeof styles> {
  name?: string
  entry?: Entry<HeroData>
}

const UnstyledContentfulHero: FunctionComponent<ContentfulHeroProps> =
  ({entry, name, classes}) => {
    const [data, setData] = useState(entry?.fields)
    useEffect(() => {
      if (!data && name) {
        client
          .getEntries<HeroData>(({ content_type: 'hero', 'fields.name': name }))
          .then(c => {
            setData(c.items[0].fields)
          })
      }
    })

    if (data) {
      const mediaData = {
        name: data.name,
        media: data.media
      } as HeroMedia

      return (
        <HeroComponent key={data.name} media={mediaData} height={data.height} shade={data.shade}>
          { data.content ? (<ContentfulRichText className={classes.content} content={data.content} />) : null }
        </HeroComponent>
      )
    } else {
      return (<Loading height="200px" />)
    }
  }

export const ContentfulHero = withStyles(styles)(UnstyledContentfulHero)
