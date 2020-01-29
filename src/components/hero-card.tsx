import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import { Theme } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia, { CardMediaProps } from '@material-ui/core/CardMedia'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { ContentFinder, Asset } from '../services/contentful'

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: '250px',
    textDecoration: 'none',
    margin: '12px',
    opacity: 0.95,
    flex: '1 0 auto',

    [theme.breakpoints.down('sm')]: {
      flex: '0 0 100%',
      maxWidth: '85%',
      height: '85px',
      display: 'flex',
      flexFlow: 'row'
    }
  },

  media: {
    height: '160px',

    [theme.breakpoints.down('sm')]: {
      height: 'auto',
      flex: '0 0 85px'
    }
  },

  header: {
  }
})

interface HeroCardProps extends WithStyles<typeof styles> {
  title: string
  subtitle?: string
  
  image?: string
  media?: string
  
  link?: string
  onClick?: () => void
}

type HeroCardMedia = {
  name: string
  media: Asset
  surpress_image: boolean
}

interface HeroCardState {
  mediaData?: HeroCardMedia
}

const heroCardFinder = new ContentFinder<HeroCardMedia>('heroCard', 'name')

class HeroCard extends React.PureComponent<HeroCardProps, HeroCardState> {

  state = {} as HeroCardState

  onClick = () => this.props.onClick ? this.props.onClick() : ''


  componentWillMount() {
    console.log(`WillMount for ${this.props.title}`)
    if (this.props.media) {
      heroCardFinder.get(this.props.media)
        .then(mediaData => {
          this.setState({ mediaData })
          console.log(`Updating media for ${this.props.media}`, mediaData)
        })
    }
  }

  renderMedia() {
    /* Don't show it if we want to surpress the image */
    if (this.state.mediaData && this.state.mediaData.surpress_image) {
      return undefined
    }

    const props: CardMediaProps = {
      className: this.props.classes.media
    }
    
    if (this.props.image) {
      props.image = this.props.image
    } else if (this.state.mediaData && this.state.mediaData.media) {
      props.image = this.state.mediaData.media.fields.file.url + "?w=250"
    } else {
      props.image = '//via.placeholder.com/1'
    }
    
    return (<CardMedia {...props} />)
  }

  render() {
    const cardProps: any = { }
    if (this.props.link && this.props.link.match(/^(https|http|tel):/)) {
      cardProps.component = (props: any) => (<a href={this.props.link} {...props}/>)
    } else if (this.props.link) {
      cardProps.component = (lp: LinkProps) => (<Link to={this.props.link} {...lp} />)
    } else if (this.props.onClick) {
      cardProps.component = (props: any) => (<a onClick={this.onClick} {...props}/>)
    }

    return (
      <Card className={this.props.classes.root} {...cardProps}>
        { this.renderMedia() }
        <CardHeader className={this.props.classes.header} title={this.props.title} subheader={ this.props.subtitle }></CardHeader>
      </Card>
    )
  }
}

export default withStyles(styles)(HeroCard)
