import { useTheme } from '@mui/material'
import { Entry } from 'contentful'
import { FunctionComponent } from 'react'
import { Button, ButtonProps } from '../components/button'
import { Youtube } from '../components/youtube'
import { useEntry } from '../services/contentful'
import { ContentfulControlledImage, ControlledImageData } from './controlled-image'
import { IFrame, IFrameData } from './iframe'
import { Lyrics, LyricsData } from './lyrics'
import { ResponsiveContent, ResponsiveContentData } from './responsive-content'

export interface YoutubeData {
  name: string
  id: string
  aspectRatio?: number
}

export interface ButtonData {
  text: string
  link: string
  fullWidth?: boolean
  type?: string
  variant?: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab'
  color?: 'inherit' | 'primary' | 'secondary' | 'default'
  align?: 'left' | 'center' | 'right'
}

interface Props {
  id: string
}

type EmbeddableTypes = ButtonData | LyricsData | YoutubeData | IFrameData | ResponsiveContentData | ControlledImageData

export const EmbeddedEntry: FunctionComponent<Props> =
  ({ id }) => {
    const { entry } = useEntry<EmbeddableTypes>(id)
    const theme = useTheme()

    switch (entry?.sys.contentType?.sys.id) {
      case 'youtubeVideo':
        const youtubeData = entry.fields as YoutubeData
        return (<Youtube key={entry.sys.id} id={youtubeData.id} aspectRatio={youtubeData.aspectRatio} />)

      case 'button':
        const bd = entry.fields as ButtonData
        const bdProps = {
          link: bd.link,
          fullWidth: bd.fullWidth,
          type: bd.type,
          variant: bd.variant,
          color: bd.color,
          align: bd.align,
          sx: { marginBottom: `${theme.spacing(1)} !important`, marginRight: `${theme.spacing(1)} !important` }
        } as ButtonProps
        return (
          <Button key={entry.sys.id} {...bdProps}>
            {bd.text}
          </Button>
        )

      case 'songLyrics':
        return (<Lyrics key={entry.sys.id} entry={entry as Entry<LyricsData>}/>)

      case 'iframe':
        return (<IFrame key={entry.sys.id} entry={entry as Entry<IFrameData>} />)

      case 'responsiveContent':
        return (<ResponsiveContent key={entry.sys.id} entry={entry as Entry<ResponsiveContentData>} />)

      case 'controlledImage':
        return (<ContentfulControlledImage key={entry.sys.id} id={entry.sys.id} entry={entry as Entry<ControlledImageData>} />)

      default:
        return (<span>`Unknown content type: ${entry?.sys.contentType?.sys.id}`</span>)
    }
  }