import { MediaRef } from '@/services/MediaService'
import { Box, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'

export type MediaItemProps = {
  media: MediaRef
}

export const MediaItem: FunctionComponent<PropsWithChildren<MediaItemProps>> =
  ({ media, children }) => (
    <Box
      position="relative"
      height={100}
      sx={{
        backgroundImage: `url("${media.url}")`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      <Typography
        position="absolute"
        left={(t) => t.spacing(2)}
        bottom={(t) => t.spacing(2)}
        sx={{ textShadow: "0px 0px 2px white, 0px 0px 3px white; " }}
      >{media.name}</Typography>
    </Box>
  )
