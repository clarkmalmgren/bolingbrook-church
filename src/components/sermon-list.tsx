import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createStyles, withStyles } from '@material-ui/styles'
import Box from '../components/box'
import SermonCard from '../components/sermon-card'
import { load } from '../store/sermons/actions'
import { Sermon } from '../models/sermon'
import { sermonSelectors } from '../store/index'

interface Props {
  sermons?: Sermon[]
  onLoad?: () => void
  classes?: any
}

const styles = createStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
  }
})

class SermonList extends React.PureComponent<Props, {}> {

  componentWillMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  get sermons(): Sermon[] {
    return this.props.sermons || []
  }

  render() {
    return (
      <Box className={this.props.classes.root}>
        { this.sermons.map(s => (<SermonCard sermon={s} key={s.date}/>)) }
      </Box>
    )
  }
}

const mapStateToProps = (state: any) =>
  ({ sermons: sermonSelectors.all(state)() })

function mapDispatchToProps(dispatch: Dispatch): any {
  return {
    onLoad: () => {
      dispatch(load())
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SermonList))
