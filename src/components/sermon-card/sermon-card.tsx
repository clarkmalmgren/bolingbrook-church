import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography';
import moment from 'moment'
import { Sermon } from '../../models/sermon'

interface Props {
  sermon: Sermon
}

export class SermonCard extends React.PureComponent<Props, {}> {

  dateString: string = moment(this.props.sermon.date).format("MMMM d, YYYY")

  render() {
    return (
      <Card className="SermonCard">
        <CardHeader title={this.props.sermon.title} subheader={this.dateString} />
        <CardMedia image={`https://i.ytimg.com/vi/${this.props.sermon.services[0].youtube}/hqdefault.jpg`}
                   className="SermonCard__media"/>
        <CardContent>
          <Typography paragraph>
            {this.props.sermon.description}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}
