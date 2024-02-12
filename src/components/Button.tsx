import { FunctionComponent, PropsWithChildren } from 'react'
import ButtonBase, { ButtonProps as ButtonBaseProps } from '@mui/material/Button'
import type { SxProps, Theme } from '@mui/material'
import type { SizeVariant } from '../theme'

type ButtonVariant = 'text' | 'primary' | 'pill'

export const FontSizes: Record<SizeVariant, number> = {
  xs: 14,
  sm: 17,
  md: 21,
  lg: 42,
  xl: 47
}

export type ButtonProps = {
  /**
   * The size of the button
   */
  size?: SizeVariant
  variant?: ButtonVariant
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> =
  ({ children, size, variant }) => {
    const sx: SxProps<Theme> = { fontSize: FontSizes[size || 'md'] }

    if (size === 'lg') {
      sx.fontWeight = '700'
    }

    if (variant === 'text') {
      sx.color = 'black'
    } else {
      sx.borderRadius = 1000
    }
    
    return (
      <ButtonBase
        variant={ variant === 'text' ? 'text' : 'contained' }
        color={ variant === 'pill' ? 'secondary' : 'primary' }
        sx={sx}
      >
        {children}
      </ButtonBase>
    )
  }
