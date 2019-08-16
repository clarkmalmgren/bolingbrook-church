import * as React from 'react'
import { Theme } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { ContentFinder, Asset } from '../services/contentful'

const styles = (theme: Theme) => createStyles({
  root: {
    margin: '0 -20px',
    position: 'relative',
    overflow: 'hidden'
  },

  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'middle center'
  },

  background: {
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },

  shade: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0
  },

  content: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    transform: 'translateY(-50%)',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',

    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap'
    }
  }
})

type HeroMedia = {
  name: string
  media: Asset[]
}

const heroFinder = new ContentFinder<HeroMedia>('hero', 'name')

export interface HeroProps extends WithStyles<typeof styles> {
  media: string
  height: number
  shade?: number
}

interface HeroState {
  height: number
  mediaData?: HeroMedia
}

class Hero extends React.PureComponent<HeroProps, HeroState> {

  static defaultProps = { height: 0.8 }

  state = { height: this.calcHeight() } as HeroState

  calcHeight(): number {
    return (window.innerHeight - 60) * this.props.height
  }

  updateHeight = () => {
    this.setState((state) => ({ height: this.calcHeight() }))
  }

  componentWillMount() {
    heroFinder.get(this.props.media)
      .then(mediaData => { this.setState({ mediaData }) })
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateHeight)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight)
  }

  background() {
    if (this.state.mediaData) {
      const file = this.state.mediaData.media[0].fields.file
      if (file.contentType.startsWith("video")) {
        return (
          <video autoPlay muted loop className={this.props.classes.video}>
            <source src={file.url} type={file.contentType} />
          </video>
        )
      } else {
        const url = file.url + "?w=" + screen.width
        return (
          <div className={this.props.classes.background} style={ { backgroundImage: `url(${url})` } } />
        )
      }
    }
  }

  renderShade() {
    return this.props.shade ?
      (<div className={this.props.classes.shade} style={({backgroundColor: `rgba(0,0,0,${this.props.shade})`})}/>) : null
  }

  render() {
    return (
      <div className={this.props.classes.root} style={{height: this.state.height + 'px'}}>
        {this.background()}

        {this.renderShade()}
        <div className={this.props.classes.content}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Hero)
