import { MediaRef, useResizedImageUrl } from '@/services/MediaService'
import { Box, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'

export type MediaItemProps = {
  media: MediaRef
}

export const MediaItem: FunctionComponent<MediaItemProps> =
  ({ media }) => {
    const url = useResizedImageUrl(media, 1500)
    
    return (
      <Box
        position="relative"
        height={100}
        sx={{
          backgroundImage: `url("${url}")`,
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
  }
