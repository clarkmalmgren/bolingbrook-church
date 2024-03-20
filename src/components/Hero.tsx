'use client'

import { ContentOf } from '@/services/ContentService'
import { MediaRef, useMedia, useResizedImageUrl } from '@/services/MediaService'
import { Box, useTheme } from '@mui/material'
import { FunctionComponent, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { DynamicComponent, ComponentById } from './DynamicComponent'
import { OutputData } from '@editorjs/editorjs'
import { RichText } from './RichText'

export type HeroProps = {
  media?: { url: string, video: boolean }
  height?: number
  shade?: number
  shadeColor?: 'black' | 'white'
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-evenly'
  imagePosition?: string
}

export const Hero: FunctionComponent<PropsWithChildren<HeroProps>> =
  ({ media, height, shade, justify, shadeColor, children, imagePosition }) => {
    const _height = height || 0.2
    const [ heightInPx, setHeightInPx ]  = useState((window.innerHeight - 60) * _height)
    const ref = useRef<HTMLDivElement>(null)
    const theme = useTheme()

    const updateHeight = () => {
      const top = ref.current?.offsetTop || 60
      setHeightInPx((window.innerHeight - top) * _height)
    }

    useEffect(() => {
      updateHeight()
      window.addEventListener('resize', updateHeight)
      return () => window.removeEventListener('resize', updateHeight)
      // eslint-disable-next-line
    }, [ height ])

    function background() {
      if (!media) {
        return null
      } else if (media.video) {
        return (
          <video autoPlay muted loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'middle center'}}>
            <source src={media.url} />
          </video>
        )
      } else {
        return (
          <Box sx={{
            position: 'absolute',
            top: 0, bottom: 0, right: 0, left: 0,
            backgroundSize: 'cover',
            zIndex: -100,
            backgroundImage: `url(${media.url})`,
            backgroundPosition: imagePosition || 'center'
          }} />
        )
      }
    }

    function renderShade() {
      if (!shade) {
        return null
      } else {
        return (
          <Box sx={{
            position: 'absolute',
            top: 0, bottom: 0, right: 0, left: 0,
            zIndex: -90,
            backgroundColor: shadeColor || 'black',
            opacity: shade
          }}/>
        )
      }
    }

    return (
      <Box ref={ref} sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: `${theme.spacing(4)} 0`,
        minHeight: heightInPx + 'px',
        justifyContent: justify || 'center',
        color: (shadeColor === 'white' ? 'black' : 'white') + ' !important'
      }}>
        {background()}
        {renderShade()}
        {children}
      </Box>
    )
  }

export type HeroContentProps = ContentOf<HeroProps> & {
  mediaRef?: string
  body?: OutputData
  children?: string[]
}

export const HeroContent: FunctionComponent<HeroContentProps> =
  ({ mediaRef, body, children, ...rest }) => {
    const mr = useMedia(mediaRef)
    const mu = useResizedImageUrl(mr, 1500)

    const media = mr ? { video: !!mr.video, url: mu || mr.url } : rest.media

    return (
      <Hero {...rest} media={media}>
        <RichText data={body} />
        { children?.map((c, i) => <ComponentById key={i} id={c} />) }
      </Hero>
    )
  }
