import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import moment from 'moment'
import { createStyles, withStyles } from '@material-ui/styles'
import Box from './box'
import YouTube from './youtube'
import { load } from '../store/sermons/actions'
import { Sermon } from '../models/sermon'
import { sermonSelectors } from '../store/index' 
import { Typography, Theme } from '@material-ui/core'

interface Props {
  date: string
  sermon?: Sermon
  onLoad?: () => void
  classes?: any
}

function sized(width: number) {
  return {
    width: `${width}px`,
    height: `${width*3/4}px`
  }
}

const styles = (theme: Theme) => createStyles({
  root: {  },
  video: {
    // display: 'block',
    // margin: '20px auto',
    // ...sized(640),
  },
  data: {
    display: 'flex',
  }
})

class SermonList extends React.PureComponent<Props, {}> {

  componentWillMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  renderLoading() {
    return (
      <Box className={this.props.classes.root}>
        <Typography variant="h2">Loading...</Typography>
      </Box>
    )
  }

  renderPlayback(sermon: Sermon) {
    return (
      <Box className={this.props.classes.root}>
        { sermon.services.map(s => <YouTube className={this.props.classes.video} key={s.youtube} id={s.youtube} />) }
        <Box className={this.props.classes.data}>
          <Box className="text">
            <Typography variant="h4">{sermon.title}</Typography>
            <Typography variant="h5">{sermon.speaker}</Typography>
          </Box>
          <Box className="date">
            <Typography variant="h5">{ moment(sermon.date).format("MMMM D, YYYY") }</Typography>
          </Box>
        </Box>
        <Typography>{sermon.description}</Typography>
      </Box>
    )
  }

  render() {
    return this.props.sermon ? this.renderPlayback(this.props.sermon) : this.renderLoading()
  }
}

function mapStateToProps(state: any, ownProps: Props): Partial<Props> {
  return {
    sermon: sermonSelectors.date(state)(ownProps.date)
  }
}

function mapDispatchToProps(dispatch: Dispatch): any {
  return {
    onLoad: () => {
      dispatch(load())
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SermonList))
