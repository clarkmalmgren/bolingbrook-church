import * as React from 'react'
import { Link } from 'react-router-dom'
import { Theme, CardContent, Card as MuiCard, ButtonBase } from '@material-ui/core'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia, { CardMediaProps } from '@material-ui/core/CardMedia'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { Asset } from '../services/contentful'

const styles = (theme: Theme) => createStyles({
  root: {
    maxWidth: '350px',
    margin: '12px',
    flex: '100%',
    textDecoration: 'none'
  },

  action: {
    display: 'block',
    width: '100%',
    textAlign: 'initial'
  },

  media: {
    height: '195px'
  },

})

interface CardProps extends WithStyles<typeof styles> {
  title: string
  subtitle?: string
  
  image?: string
  media?: Asset
  
  link?: string
  onClick?: () => void
}

class Card extends React.PureComponent<CardProps, {}> {

  onClick = () => this.props.onClick ? this.props.onClick() : ''

  renderMedia() {
    const props: CardMediaProps = {
      className: this.props.classes.media
    }
    
    if (this.props.image) {
      props.image = this.props.image
    } else if (this.props.media) {
      props.image = this.props.media.fields.file.url + "?w=600"
    } else {
      props.image = '//via.placeholder.com/1'
    }
    
    return (<CardMedia {...props} />)
  }

  render() {
    const buttonBaseProps: any = { }
    if ((this.props.link && this.props.link.match(/^(https|http|tel|mailto):/)) || this.props.onClick) {
      buttonBaseProps.component = 'a'
    } else if (this.props.link) {
      buttonBaseProps.component = Link
    }

    return (
      <MuiCard className={this.props.classes.root}>
        <ButtonBase className={this.props.classes.action} {...buttonBaseProps} to={this.props.link} href={this.props.link} onClick={this.onClick}>
          { this.renderMedia() }
          <CardHeader title={this.props.title} subheader={ this.props.subtitle }></CardHeader>
          <CardContent>{this.props.children}</CardContent>
        </ButtonBase>
      </MuiCard>
    )
  }
}

export default withStyles(styles)(Card)
