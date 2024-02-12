import ButtonBase from '@mui/material/Button'
import { FunctionComponent, PropsWithChildren } from 'react'

export type ButtonProps = {
  size?: 'small' | 'medium' | 'large'
}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> =
  ({ children, size }) => {
    
    return (
      <ButtonBase
        variant="contained"
        color="primary"
        sx={{ m: 1, borderRadius: 80, color: 'black' }}
        size={size}
      >
        {children}
      </ButtonBase>
    )
  }
