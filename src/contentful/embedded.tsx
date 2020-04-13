import { Entry } from 'contentful'
import React, { FunctionComponent, useEffect, useState } from 'react'
import Button, { ButtonProps } from '../components/button'
import Youtube from '../components/youtube'
import { client } from '../services/contentful'

export interface YoutubeData {
  name: string
  id: string
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

export const EmbeddedEntry: FunctionComponent<Props> =
  ({id}) => {
    const [entry, setEntry] = useState(undefined as undefined | Entry<YoutubeData | ButtonData>)
    useEffect(() => {
      if (!entry) {
        client.getEntry<YoutubeData | ButtonData>(id).then(setEntry)
      }
    }, [entry, id])

    if (entry?.sys.contentType?.sys.id === 'youtubeVideo') {
      const youtubeData = entry.fields as YoutubeData
      return (<Youtube key={entry.sys.id} id={youtubeData.id} />)
    } else if (entry?.sys.contentType?.sys.id === 'button') {
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
    } else {
      return null
    }
  }