import { useResizedImageUrl } from '@/services/MediaService'
import { MediaRef } from '@/services/models/MediaRef'
import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import { DeleteMedia } from './DeleteMedia'

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

export const MediaCard: FunctionComponent<MediaItemProps> =
  ({ media }) => {
    const url = useResizedImageUrl(media, 750)

    return (
      <Card sx={{ width: 400, m: 2 }}>
        <CardMedia image={url} height={240} component="img" />
        <CardHeader title={media.name} />
        <CardContent>
          <Typography>{media.description}</Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <DeleteMedia media={media} />
        </CardActions>
      </Card>
    )
  }