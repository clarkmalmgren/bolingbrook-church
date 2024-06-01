'use client'

import { useMedia, useResizedImageUrl } from '@/services/MediaService';
import { ContentOf } from '@/services/models/Content';
import { OutputData } from '@editorjs/editorjs';
import { FunctionComponent } from 'react';
import { Card, CardProps } from './Card';
import { RichText } from './RichText';

export type CardContentProps = ContentOf<CardProps> & {
  mediaRef?: string
  body?: OutputData
}

export const CardContent: FunctionComponent<CardContentProps> =
  ({ title, subtitle, image, link, mediaRef, body }) => {
    const media = useMedia(mediaRef)
    const mediaUrl = useResizedImageUrl(media, 750)

    return (
      <Card title={title} subtitle={subtitle} image={mediaUrl || image} link={link}>
        <RichText data={body} />
      </Card>
    )
  }
