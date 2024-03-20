import { ContentOf } from '@/services/ContentService'
import { useMedia, useResizedImageUrl } from '@/services/MediaService'
import { OutputData } from '@editorjs/editorjs'
import { CardActionArea, CardHeader, CardMedia, Card as MuiCard, CardContent as MuiCardContent } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent, PropsWithChildren } from 'react'
import { RichText } from './RichText'

type CardProps = {
  title: string
  subtitle?: string
  image?: string
  link?: string
  onClick?: () => void
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> =
  ({ title, subtitle, image, link, onClick, children }) => {
    const actionProps: any = { }
    if (link) {
      actionProps.component = Link
      actionProps.href = link
    }

    return (
      <MuiCard sx={{ maxWidth: '350px', margin: '12px', flex: '100%', textDecoration: 'none' }} onClick={onClick}>
        <CardActionArea {...actionProps}>
          { image && <CardMedia sx={{ height: '195px' }} image={image} height={195} component="img" /> }
          <CardHeader title={title} subheader={ subtitle }></CardHeader>
          <MuiCardContent>{children}</MuiCardContent>
        </CardActionArea>
      </MuiCard>
    )
  }

export type CardContentProps = ContentOf<CardProps> & {
  mediaRef?: string
  body?: OutputData
}

export const CardContent: FunctionComponent<CardContentProps> =
  ({ title, subtitle, image, link, mediaRef, body }) => {
    const media = useMedia(mediaRef)
    const mediaUrl = useResizedImageUrl(media, 750)

    return (
      <Card title={title} subtitle={subtitle} image={mediaUrl || image} link={link} >
        <RichText data={body} />
      </Card>
    )
  }
