import * as React from 'react'
import { match } from 'react-router'
import { createStyles, withStyles } from '@material-ui/styles'
import SermonList from '../components/sermon-list'
import SermonPlayback from '../components/sermon-playback'
import { Typography } from '@material-ui/core';

interface MatchParams { id: string }

interface Props {
  match: match<MatchParams>
}

const styles = createStyles({
  root: {}
})


class Sermon extends React.PureComponent<Props, {}> {

  render() {
    return (
      <div>
        <SermonPlayback date={this.props.match.params.id} />

        <Typography variant="h1" align="center">More Sermons</Typography>

        <SermonList />
      </div>
    )
  }
}

export default withStyles(styles)(Sermon)
