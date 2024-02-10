import { Typography } from '@mui/material'
import moment from 'moment'
import { FunctionComponent } from 'react'
import { getImageUrl, Sermon } from '../models/sermon'
import { Card } from './card'

export type SermonCardProps = {
  sermon: Sermon
  linkRoot: string
}

export const SermonCard: FunctionComponent<SermonCardProps> =
  ({ sermon, linkRoot }) => {
    const dateString: string = moment(sermon.date).format("MMMM D, YYYY")

    return (
      <Card title={sermon.title}
            subtitle={dateString}
            image={getImageUrl(sermon)}
            link={`${linkRoot}/${sermon.date}`}>
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
