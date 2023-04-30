import { Card as MuiCard, CardActionArea, CardContent, CardHeader, CardMedia } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { Asset } from '../services/contentful'

type CardProps = {
  title: string
  subtitle?: string
  
  image?: string
  media?: Asset
  
  link?: string
  onClick?: () => void
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> =
  ({ title, subtitle, image, media, link, onClick, children }) => {

    function renderMedia() {
      const img = image || (media ? media.fields?.file?.url + "?w=600" : undefined)
      return img ? <CardMedia sx={{ height: '195px' }} image={img} height={195} component="img" /> : null
    }

    const buttonBaseProps: any = { }
    if ((link && link.match(/^(https|http|tel|mailto):/)) || onClick) {
      buttonBaseProps.component = 'a'
    } else if (link) {
      buttonBaseProps.component = Link
    }

    return (
      <MuiCard sx={{ maxWidth: '350px', margin: '12px', flex: '100%', textDecoration: 'none' }}>
        <CardActionArea {...buttonBaseProps} to={link} href={link} onClick={() => onClick && onClick()}>
          { renderMedia() }
          <CardHeader title={title} subheader={ subtitle }></CardHeader>
          <CardContent>{children}</CardContent>
        </CardActionArea>
      </MuiCard>
    )
  }
