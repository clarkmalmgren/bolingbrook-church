import React from 'react'
import { Card, CardHeader, CardMedia, CardContent, Link } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles';
import { StaffInfo } from '../services/staff'

const styles = createStyles({
  root: {
    maxWidth: '300px',
    margin: '12px',
    flex: '100%',
    textDecoration: 'none',
    
    '& .media': {
      height: '300px',
    },
    
    '& .desc': {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: 4,
      WebkitBoxOrient: 'vertical'
    }
  }
})

export interface StaffCardProps extends WithStyles<typeof styles> {
  info: StaffInfo
}

class StaffCard extends React.PureComponent<StaffCardProps, {}> {

  render() {
    return (
      <Card className={this.props.classes.root}>
        <CardMedia image={ this.props.info.picture.fields.file.url } className="media"/>
        <CardHeader title={this.props.info.name} subheader={this.props.info.title} />
        <CardContent>
          <Link href={`mailto:${this.props.info.email}`}>{this.props.info.email}</Link>
        </CardContent>
      </Card>
    )
  }
}

export default withStyles(styles)(StaffCard)
