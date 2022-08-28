import { Typography } from '@mui/material'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import moment from 'moment'
import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { Sermon } from '../models/sermon'
import { sermonSelectors } from '../store/index'
import { load } from '../store/sermons/actions'
import { Box } from './box'
import YouTube from './youtube'

const styles = createStyles({
  data: {
    display: 'flex',
  }
})

interface Props extends WithStyles<typeof styles> {
  date: string
  sermon?: Sermon
  onLoad?: () => void
}



class SermonList extends React.PureComponent<Props, {}> {

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  renderLoading() {
    return (
      <Box>
        <Typography variant="h2">Loading...</Typography>
      </Box>
    )
  }

  renderPlayback(sermon: Sermon) {
    return (
      <Box>
        { sermon.services.map(s => <YouTube key={s.youtube} id={s.youtube} />) }
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
