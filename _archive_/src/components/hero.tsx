import { Box, useTheme } from '@mui/material'
import { FunctionComponent, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Asset } from 'contentful'

export type HeroMedia = {
  name: string
  media: Asset[]
}

export type HeroProps = {
  media: HeroMedia
  height: number
  shade?: number
  shadeColor?: 'black' | 'white',
  justify?: 'flex-start' | 'center' | 'flex-end' 
  imagePosition?: string
}

export const Hero: FunctionComponent<PropsWithChildren<HeroProps>> =
  ({ media, height, shade, justify, shadeColor, children, imagePosition }) => {
    const [ heightInPx, setHeightInPx ]  = useState((window.innerHeight - 60) * height)
    const ref = useRef<HTMLDivElement>(null)
    const theme = useTheme()

    const updateHeight = () => {
      const top = ref.current?.offsetTop || 60
      setHeightInPx((window.innerHeight - top) * height)
    }

    useEffect(() => {
      updateHeight()
      window.addEventListener('resize', updateHeight)
      return () => window.removeEventListener('resize', updateHeight)
      // eslint-disable-next-line
    }, [ height ])

    function background() {
      const file = media.media[0].fields.file
      if (file.contentType.startsWith("video")) {
        return (
          <video autoPlay muted loop
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'middle center'}}>
            <source src={file.url} type={file.contentType} />
          </video>
        )
      } else {
        return (
          <Box sx={{
            position: 'absolute',
            top: 0, bottom: 0, right: 0, left: 0,
            backgroundSize: 'cover',
            zIndex: -100,
            backgroundImage: `url(${file.url + "?w=" + window.screen.width})`,
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
        justifyContent: justify || 'center'
      }}>
        {background()}
        {renderShade()}
        {children}
      </Box>
    )
  }
