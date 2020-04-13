import { Typography } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import moment from 'moment'
import React, { FunctionComponent } from 'react'
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
