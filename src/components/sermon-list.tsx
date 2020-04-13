import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import CardList from '../components/card-list'
import SermonCard from '../components/sermon-card'
import { Sermon } from '../models/sermon'
import { sermonSelectors } from '../store/index'
import { load } from '../store/sermons/actions'
import Box from './box'

interface Props {
  sermons?: Sermon[]
  onLoad?: () => void
  classes?: any
  linkRoot: string
  all?: boolean
}

class SermonList extends React.PureComponent<Props, {}> {

  static defaultProps: Pick<Props, 'linkRoot'> = {
    linkRoot: '/sermons'
  }

  componentDidMount() {
    if (this.props.onLoad) {
      this.props.onLoad()
    }
  }

  get sermons(): Sermon[] {
    return this.props.sermons || []
  }

  render() {
    return (
      <Box variant="wide-section">
        <CardList>
          { this.sermons.map(s => (<SermonCard sermon={s} key={s.date} linkRoot={this.props.linkRoot}/>)) }
        </CardList>
      </Box>
    )
  }
}

const mapStateToProps = (state: any, ownState: Props) => {
  const selector = ownState.all ? sermonSelectors.all : sermonSelectors.published
  return {
    sermons: selector(state)()
  }
}

function mapDispatchToProps(dispatch: Dispatch): any {
  return {
    onLoad: () => {
      dispatch(load())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SermonList)
