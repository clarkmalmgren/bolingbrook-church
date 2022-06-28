import { Typography } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import moment from 'moment'
import { FunctionComponent } from 'react'
import { getImageUrl, Sermon } from '../models/sermon'
import Card from './card'

const styles = createStyles({
  description: {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical'
  }
})

export interface SermonCardProps extends WithStyles<typeof styles> {
  sermon: Sermon
  linkRoot: string
}

const UnstyledSermonCard: FunctionComponent<SermonCardProps> =
  ({sermon, linkRoot, classes}) => {
    const dateString: string = moment(sermon.date).format("MMMM D, YYYY")

    return (
      <Card title={sermon.title}
            subtitle={dateString}
            image={getImageUrl(sermon)}
            link={`${linkRoot}/${sermon.date}`}>
        <Typography className={classes.description}>
          {sermon.description}
        </Typography>
      </Card>
    )
  }

export default withStyles(styles)(UnstyledSermonCard)
