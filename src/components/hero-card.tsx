import * as React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import { Theme } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { getMediaUrl } from '../services/contentful'

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
  cdnImage?: string
  
  link?: string
  onClick?: () => void
}

interface HeroCardState {
  cdnImageUrl?: string
}

class HeroCard extends React.PureComponent<HeroCardProps, HeroCardState> {

  state = {} as HeroCardState

  onClick = () => this.props.onClick ? this.props.onClick() : ''


  componentWillMount() {
    if (this.props.cdnImage) {
      getMediaUrl(this.props.cdnImage, 250)
        .then(url => { this.setState({ cdnImageUrl: url }) })
    }
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
        <CardMedia className={this.props.classes.media} image={this.props.image || this.state.cdnImageUrl}></CardMedia>
        <CardHeader className={this.props.classes.header} title={this.props.title} subheader={ this.props.subtitle }></CardHeader>
      </Card>
    )
  }
}

export default withStyles(styles)(HeroCard)
