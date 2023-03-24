import { SxProps, Theme } from '@mui/material'
import { Asset, Entry, EntryFields } from 'contentful'
import { FunctionComponent, useEffect, useState } from 'react'
import { Hero, HeroMedia } from '../components/hero'
import { client } from '../services/contentful'
import { ContentfulRichText } from './rich-text'
import { Loading } from '../components/loading'
import { sxes } from '../utils/sxes'

const Styles: { [name: string]: SxProps<Theme> } = {
  center: { textAlign: 'center' },

  right: {
    alignSelf: 'right',
    padding: (theme) => `0 ${theme.spacing(4)}`,
    maxWidth: { xs: 'initial', md: '45%' }
  },

  left: {
    textAlign: 'left',
    padding: (theme) => `0 ${theme.spacing(4)}`,
    maxWidth: { xs: 'initial', md: '45%' }
  },

  white: { color: 'white' },

  black: { color: 'black' }
}

export type HeroData = {
  name: string
  media: Asset[]
  content?: EntryFields.RichText
  height: number
  shade?: number
  colorScheme?: 'black on white' | 'white on black'
  alignment?: 'left' | 'center' | 'right'
  imagePosition?: string
}

type ContentfulHeroProps = {
  name?: string
  entry?: Entry<HeroData>
}

export const ContentfulHero: FunctionComponent<ContentfulHeroProps> =
  ({ entry, name }) => {
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

      const shadeColor = data.colorScheme === 'black on white' ? 'white' : 'black'
      const color = data.colorScheme === 'black on white' ? Styles.black : Styles.white
      const alignment = data.alignment === 'left' ? Styles.left : data.alignment === 'right' ? Styles.right : Styles.center
      const justify = data.alignment === 'left' ? 'flex-start' : data.alignment === 'right' ? 'flex-end' : 'center'

      return (
        <Hero key={data.name} media={mediaData} height={data.height} shade={data.shade} shadeColor={shadeColor} justify={justify} imagePosition={data.imagePosition}>
          { data.content ? (<ContentfulRichText sx={sxes([color, alignment])} content={data.content} />) : null }
        </Hero>
      )
    } else {
      return (<Loading height="200px" />)
    }
  }
