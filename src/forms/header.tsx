import { Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'

type HeaderProps = {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

export const Header: FunctionComponent<PropsWithChildren<HeaderProps>> =
  (props) => (
    <Typography
      sx={{flex: '0 0 100%', margin: '15px 0'}}
      variant={props.variant}
    >{props.children}</Typography>
  )
