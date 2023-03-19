import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { Theme, CardContent, Card as MuiCard, CardActionArea } from '@mui/material'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import { createStyles, withStyles, WithStyles } from '@mui/styles'
import { Asset } from '../services/contentful'

const styles = (theme: Theme) => createStyles({
  root: {
    maxWidth: '350px',
    margin: '12px',
    flex: '100%',
    textDecoration: 'none'
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

class Card extends React.PureComponent<PropsWithChildren<CardProps>, {}> {

  onClick = () => this.props.onClick ? this.props.onClick() : ''

  renderMedia() {
    const image = this.props.image || (this.props.media ? this.props.media?.fields?.file?.url + "?w=600" : undefined)
    return image ? <CardMedia className={this.props.classes.media} image={image} height={195} component="img" /> : null
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
        <CardActionArea {...buttonBaseProps} to={this.props.link} href={this.props.link} onClick={this.onClick}>
          { this.renderMedia() }
          <CardHeader title={this.props.title} subheader={ this.props.subtitle }></CardHeader>
          <CardContent>{this.props.children}</CardContent>
        </CardActionArea>
      </MuiCard>
    )
  }
}

export default withStyles(styles)(Card)
