import React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core'
import { ContentFinder } from '../services/contentful'
import Box from './box'
import Content from './content'
import moment from 'moment'

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: theme.palette.secondary.light,
    top: '0',
    left: '0',
    right: '0'
  }

})
interface BannerProps extends WithStyles<typeof styles>{
}

interface BannerState {
  data?: any
}

const contentFinder = new ContentFinder<any, boolean>('banner', 'active')

class Banner extends React.PureComponent<BannerProps, BannerState> {

  state = {
    data: undefined
  }

  async componentWillMount() {
    const active = await contentFinder.find(true)
    const now = moment()
    const dateBounded = active.find((b) => {
      return (!b.start || moment(b.start).isBefore(now)) && (!b.end || moment(b.end).isAfter(now))
    })
    this.setState({ data: dateBounded })
  }

  render() {
    if (this.state.data) {
      return (
        <div className={this.props.classes.root}>
          <Content data={this.state.data} boxVariant="main" />
        </div>
      )
    } else {
      return null
    }
  }
}

export default withStyles(styles)(Banner)
