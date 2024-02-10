import { FunctionComponent, PropsWithChildren } from 'react'
import { Button as ButtonBase } from '../mui'

export type ButtonProps = {

}

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> =
  ({ children }) => {
    
    return (
      <ButtonBase placeholder="">
        {children}
      </ButtonBase>
    )
  }
