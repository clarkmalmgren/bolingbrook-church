import { Card as MuiCard, CardActionArea, CardContent, CardHeader, CardMedia, Box } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent, PropsWithChildren } from 'react'

type CardProps = {
  title: string
  subtitle?: string
  image?: string
  link?: string
  onClick?: () => void
}

export const Card: FunctionComponent<PropsWithChildren<CardProps>> =
  ({ title, subtitle, image, link, onClick, children }) => {
    const actionProps: any = { }
    if (link) {
      actionProps.component = Link
      actionProps.href = link
    }

    return (
      <MuiCard sx={{ maxWidth: '350px', margin: '12px', flex: '100%', textDecoration: 'none' }} onClick={onClick}>
        <CardActionArea {...actionProps}>
          { image && <CardMedia sx={{ height: '195px' }} image={image} height={195} component="img" /> }
          <CardHeader title={title} subheader={ subtitle }></CardHeader>
          <CardContent>{children}</CardContent>
        </CardActionArea>
      </MuiCard>
    )
  }

export const CardList: FunctionComponent<PropsWithChildren<{}>> =
  ({ children }) => (
    <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
      { children }
    </Box>
  )
