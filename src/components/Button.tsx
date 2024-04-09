import { ContentOf } from '@/services/models/Content'
import { sxes } from '@/services/utils/sxes'
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
  sx?: SxProps<Theme>
  
  link?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> =
  ({ children, disabled, variant, fullWidth, size, color, link, textSize, textColor, sx, onClick }) => {
    const props: ButtonBaseProps = {
      disabled, fullWidth, size, onClick,
      variant: variant || 'contained',
      color: color || 'primary',
      href: link
    }
    if (link) { props.component = Link }
    
    return (
      <ButtonBase {...props} sx={sxes([ { m: 1, borderRadius: 80 }, sx ])} >
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
