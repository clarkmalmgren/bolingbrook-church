'use client'

import { getImageUrl, Sermon } from '@/services/models/sermon'
import { Typography } from '@mui/material'
import moment from 'moment'
import { FunctionComponent } from 'react'
import { Card } from './Card'

export type SermonCardProps = {
  sermon: Sermon
  onClick?: (sermon: Sermon) => void
}

export const SermonCard: FunctionComponent<SermonCardProps> =
  ({ sermon, onClick }) => {
    const dateString: string = moment(sermon.date).format("MMMM D, YYYY")

    return (
      <Card
        title={sermon.title}
        subtitle={dateString}
        image={ getImageUrl(sermon) }
        link={ onClick ? undefined : `/sermons/${sermon.date}` }
        onClick={ typeof window === 'undefined' ? undefined : () => onClick?.(sermon) }
      >
        <Typography
          sx={{
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {sermon.description}
        </Typography>
      </Card>
    )
  }
