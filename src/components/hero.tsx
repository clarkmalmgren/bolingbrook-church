import * as React from 'react'
import { Theme } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { getMediaUrl } from '../services/contentful'

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

export interface VideoSource {
  url: string
  type: string
}

export interface HeroProps extends WithStyles<typeof styles> {
  video?: VideoSource[]
  image?: string
  cdnImage?: string
  height: number
  shade?: number
}

interface HeroState {
  height: number
  cdnImageUrl?: string
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
    if (this.props.cdnImage) {
      getMediaUrl(this.props.cdnImage)
        .then(url => { this.setState({ cdnImageUrl: url }) })
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateHeight)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight)
  }

  background() {
    if (this.props.video) {
      return (
        <video autoPlay loop className={this.props.classes.video}>
          { this.props.video.map((s) => <source key={s.url} src={s.url} type={s.type} />) }
        </video>
      )
    } else if (this.props.image || this.state.cdnImageUrl) {
      const url = this.props.image || this.state.cdnImageUrl
      return (
        <div className={this.props.classes.background}
             style={ { backgroundImage: `url(${url})` } } />
      )
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
