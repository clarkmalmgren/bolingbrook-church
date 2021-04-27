import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { Asset, Entry, EntryFields } from 'contentful'
import { FunctionComponent, useEffect, useState } from 'react'
import { Hero, HeroMedia } from '../components/hero'
import { client } from '../services/contentful'
import { ContentfulRichText } from './rich-text'
import { Loading } from '../components/loading'

const useStyes = makeStyles((theme: Theme) => 
  createStyles({
    center: { textAlign: 'center' },
    right: {
      alignSelf: 'right',
      padding: `0 ${theme.spacing(4)}px`,
      [theme.breakpoints.up('md')]: { maxWidth: '45%' }
    },

    left: {
      textAlign: 'left',
      padding: `0 ${theme.spacing(4)}px`,
      [theme.breakpoints.up('md')]: { maxWidth: '45%' }
    },

    white: { color: 'white' },
    black: { color: 'black' },
  }))

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
    const classes = useStyes()
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
      const color = data.colorScheme === 'black on white' ? classes.black : classes.white
      const alignment = data.alignment === 'left' ? classes.left : data.alignment === 'right' ? classes.right : classes.center
      const justify = data.alignment === 'left' ? 'flex-start' : data.alignment === 'right' ? 'flex-end' : 'center'

      return (
        <Hero key={data.name} media={mediaData} height={data.height} shade={data.shade} shadeColor={shadeColor} justify={justify} imagePosition={data.imagePosition}>
          { data.content ? (<ContentfulRichText className={`${color} ${alignment}`} content={data.content} />) : null }
        </Hero>
      )
    } else {
      return (<Loading height="200px" />)
    }
  }
