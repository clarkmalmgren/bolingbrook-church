'use client'

import { useMedia } from '@/services/MediaService'
import { Box, SxProps, Theme } from '@mui/material'
import { CSSProperties, FunctionComponent, PropsWithChildren } from 'react'

export type MediaByIdProps = {
  id: string
  style?: CSSProperties
}

export type BackgroundMediaByIdProps = {
  id: string
  sx?: SxProps<Theme>
}

export const MediaById: FunctionComponent<MediaByIdProps> =
  ({ id, style }) => {
    const ref = useMedia(id)

    if (!ref) {
      return null
    } else if (ref.video) {
      return (
        <video autoPlay muted loop
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'middle center',
            ...style
          }}>
          <source src={ref.url} />
        </video>
      )
    } else {
      return <img style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', ...style }} src={ref.url} />
    }
  }


export const BackgroundMediaById: FunctionComponent<PropsWithChildren<BackgroundMediaByIdProps>> =
  ({ id, sx, children }) => {
    const ref = useMedia(id)

    return (
      <Box sx={sx} style={{ backgroundImage: ref ? `url(${ref.url})` : undefined }}>
        {children}
      </Box>
    )
  }
