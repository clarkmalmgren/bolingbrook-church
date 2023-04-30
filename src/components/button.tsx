import { Button as MuiButton, SxProps, Theme } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { sxes } from '../utils/sxes'

export type ButtonProps = {
  disabled?: boolean
  fullWidth?: boolean
  size?: 'small' | 'medium' | 'large'
  type?: string
  variant?: 'text' | 'flat' | 'outlined' | 'contained' | 'raised' | 'fab' | 'extendedFab'
  sx?: SxProps<Theme>
  color?: 'inherit' | 'primary' | 'secondary' | 'default'
  
  align?: 'left' | 'center' | 'right'
  link?: string
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> =
  (props) => {
    const muiProps: any =
    {
      disabled: props.disabled,
      fullWidth: props.fullWidth,
      size: props.size,
      type: props.type,
      variant: props.variant,
      children: props.children,
      color: props.color
    }
    
    if (props.link && props.link.match(/^(https|http|tel):/)) {
      muiProps.component = 'a'
      muiProps.href = props.link
    } else if (props.link) {
      muiProps.component = RouterLink
      muiProps.to = props.link
    }

    const sx = sxes([
      { fontSize: '18px', padding: '4px 22px !important', textDecoration: 'none' },
      props.align === 'left' && { textAlign: 'left', justifyContent: 'left' },
      props.sx
    ])

    return (
      <MuiButton sx={sx} {...muiProps}></MuiButton>
    )
  }
