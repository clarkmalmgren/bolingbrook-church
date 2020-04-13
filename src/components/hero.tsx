import { Theme } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import React from 'react'
import ReactDOM from 'react-dom'
import { Asset } from '../services/contentful'

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
    transform: 'translateY(-50%)',

    width: '100%',
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'center',

    '&.bottom': {
      [theme.breakpoints.up('sm')]: {
        top: 'inherit',
        transform: 'inherit',
        bottom: '25px'
      }
    },
    
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    }
  }
})

export type HeroMedia = {
  name: string
  media: Asset[]
}

export interface HeroProps extends WithStyles<typeof styles> {
  media: HeroMedia
  height: number
  shade?: number
  bottom?: boolean
}

interface HeroState {
  height: number
}

class Hero extends React.PureComponent<HeroProps, HeroState> {

  static defaultProps = { height: 0.8 }

  state = {
    height: this.calcHeight()
  } as HeroState

  calcHeight(): number {
    let top = 60
    const el = ReactDOM.findDOMNode(this.refs['box']) as Element | undefined
    if (el) {
      top = el.getBoundingClientRect().top + window.scrollY
    }
    return (window.innerHeight - top) * this.props.height
  }

  updateHeight = () => {
    this.setState({ height: this.calcHeight() })
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateHeight)
    setTimeout(() => this.updateHeight(), 200)
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateHeight)
  }

  background() {
    const file = this.props.media.media[0].fields.file
    if (file.contentType.startsWith("video")) {
      return (
        <video autoPlay muted loop className={this.props.classes.video}>
          <source src={file.url} type={file.contentType} />
        </video>
      )
    } else {
      const url = file.url + "?w=" + window.screen.width
      return (
        <div className={this.props.classes.background} style={ { backgroundImage: `url(${url})` } } />
      )
    }
  }

  renderShade() {
    return this.props.shade ?
      (<div className={this.props.classes.shade} style={({backgroundColor: `rgba(0,0,0,${this.props.shade})`})}/>) : null
  }

  contentClassName(): string {
    return this.props.classes.content + (this.props.bottom ? ' bottom' : '')
  }

  render() {
    return (
      <div ref='box' className={this.props.classes.root} style={{height: this.state.height + 'px'}}>
        {this.background()}

        {this.renderShade()}
        <div className={this.contentClassName()}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Hero)
