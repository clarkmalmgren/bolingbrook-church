import { ContentOf } from '@/services/ContentService'
import { Box, SxProps, Theme, Typography, TypographyOwnProps } from '@mui/material'
import ButtonBase, { ButtonProps as ButtonBaseProps } from '@mui/material/Button'
import Link from 'next/link'
import { FunctionComponent, PropsWithChildren } from 'react'

export type ButtonProps = {
  disabled?: boolean
  fullWidth?: boolean
  color?: ButtonBaseProps['color']
  size?: 'small' | 'medium' | 'large'
  variant?: 'text' | 'contained' | 'outlined'
  textSize?: TypographyOwnProps['variant']
  textColor?: TypographyOwnProps['color']
  
  link?: string
  onClick?: () => any
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> =
  ({ children, disabled, variant, fullWidth, size, color, link, textSize, textColor, onClick }) => {
    const props: ButtonBaseProps = {
      disabled, fullWidth, size, onClick,
      variant: variant || 'contained',
      color: color || 'primary',
      href: link
    }
    if (link) { props.component = Link }
    
    const sx: SxProps<Theme> = { m: 1, borderRadius: 80 }
    
    return (
      <ButtonBase {...props} sx={sx} >
        <Box position="relative" top="2px">
          { textSize ? <Typography variant={textSize} color={textColor}>{children}</Typography>
                     : children
          }
        </Box>
      </ButtonBase>
    )
  }

export type ButtonContentProps =  ContentOf<ButtonProps> & { text: string }

export const ButtonContent: FunctionComponent<ButtonContentProps> =
  (props) => (<Button {...props}>{props.text}</Button>)
