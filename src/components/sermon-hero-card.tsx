import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';
import { Sermon, getImageUrl, isToday } from '../models/sermon'
import HeroCard from './hero-card'
import { load } from '../store/sermons/actions'
import { sermonSelectors } from '../store/index' 

const styles = createStyles({
  root: {}
})

interface SermonHeroCardProps extends WithStyles<typeof styles> {
  sermon?: Sermon
  onload: () => void
}

class SermonHeroCard extends React.PureComponent<SermonHeroCardProps, {}> {

  componentWillMount() {
    this.props.onload()
  }

  render() {
    if (!this.props.sermon) {
      return (<HeroCard title="" image="" link="#"/>)
    } else {
      return (
        <HeroCard title={ isToday(this.props.sermon ) ? "Today's Sermon" : "Latest Sermon" }
                  subtitle={ this.props.sermon.title }
                  image={ getImageUrl(this.props.sermon) }
                  link={ `/sermons/${this.props.sermon.date}` }/>
      )
    }
  }
}

function mapStateToProps(state: any): Pick<SermonHeroCardProps, 'sermon'> {
  return {
    sermon: sermonSelectors.current(state)()
  }
}

function mapDispatchToProps(dispatch: Dispatch): Pick<SermonHeroCardProps, 'onload'> {
  return {
    onload: () => {
      dispatch(load())
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SermonHeroCard))
