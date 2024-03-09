import { ContentOf } from '@/services/ContentService'
import { Box, SxProps, Theme } from '@mui/material'
import ButtonBase, { ButtonProps as ButtonBaseProps } from '@mui/material/Button'
import Link from 'next/link'
import { FunctionComponent, PropsWithChildren } from 'react'

export type ButtonProps = {
  disabled?: boolean
  fullWidth?: boolean
  cancel?: boolean
  size?: 'small' | 'medium' | 'large'
  
  link?: string
  onClick?: () => any
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> =
  ({ children, disabled, fullWidth, size, cancel, link, onClick }) => {
    const props: ButtonBaseProps = {
      disabled, fullWidth, size, onClick,
      variant: 'contained',
      color: cancel ? 'error' : 'primary',
      href: link
    }
    if (link) { props.component = Link }
    
    const sx: SxProps<Theme> = { m: 1, borderRadius: 80 }
    if (!cancel) { sx.color = 'black' }
    
    return (
      <ButtonBase {...props} sx={sx}>
        <Box position="relative" top="2px">
          {children}
        </Box>
      </ButtonBase>
    )
  }

export const ButtonContent: FunctionComponent<ContentOf<ButtonProps, 'button'> & { text: string }> =
  (props) => (<Button {...props}>{props.text}</Button>)
