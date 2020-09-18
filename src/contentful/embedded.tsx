import { Entry } from 'contentful'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Button, { ButtonProps } from '../components/button'
import Youtube from '../components/youtube'
import { client } from '../services/contentful'
import { Lyrics, LyricsData } from './lyrics'

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

type EmbeddableTypes = ButtonData | LyricsData | YoutubeData

export const EmbeddedEntry: FunctionComponent<Props> =
  ({id}) => {
    const [entry, setEntry] = useState(undefined as undefined | Entry<EmbeddableTypes>)
    useEffect(() => {
      if (!entry) {
        client.getEntry<EmbeddableTypes>(id).then(setEntry)
      }
    }, [entry, id])

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
        } as ButtonProps
        return (
          <Button key={entry.sys.id} {...bdProps}>
            {bd.text}
          </Button>
        )

      case 'songLyrics':
        return (<Lyrics key={entry.sys.id} entry={entry as Entry<LyricsData>}/>)

      default:
        return null
    }
  }