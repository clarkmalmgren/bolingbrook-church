import React from 'react'
import moment from 'moment'
import { Link, LinkProps } from 'react-router-dom'
import { Card, CardHeader, CardMedia, CardContent, Typography, CardActions } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import { Sermon, getImageUrl } from '../models/sermon'

const styles = createStyles({
  root: {
    maxWidth: '350px',
    margin: '12px',
    flex: '100%',
    textDecoration: 'none',
    
    '& .media': {
      height: '195px',
    },
    
    '& .desc': {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 4,
      WebkitBoxOrient: 'vertical'
    }
  }
})

export interface SermonCardProps extends WithStyles<typeof styles> {
  sermon: Sermon
  linkRoot: string
}

class SermonCard extends React.PureComponent<SermonCardProps, {}> {

  dateString: string = moment(this.props.sermon.date).format("MMMM D, YYYY")


  private link = (lp: LinkProps) => (<Link to={`${this.props.linkRoot}/${this.props.sermon.date}`} {...lp} />)
  private baseCardProps: any = { component: this.link }

  render() {
    return (
      <Card className={this.props.classes.root} {...this.baseCardProps}>
        <CardMedia image={ getImageUrl(this.props.sermon) } className="media"/>
        <CardHeader title={this.props.sermon.title} subheader={this.dateString} />
        <CardContent>
          <Typography className="desc">
            {this.props.sermon.description}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(SermonCard)
