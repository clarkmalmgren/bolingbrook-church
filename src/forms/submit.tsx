import { FunctionComponent, PropsWithChildren } from 'react'
import { Button, ButtonProps } from '@mui/material'
import { FullWidthSx } from './styles'
import { UseFormReturn } from 'react-hook-form'

type SubmitProps = ButtonProps & { methods?: UseFormReturn }

export const Submit: FunctionComponent<PropsWithChildren<SubmitProps>> =
  ({children, methods, ...props}) => {
    if (!methods) { throw new Error("Only use Submit as a direct child of Form") }

    return (
      <Button
        sx={FullWidthSx}
        variant="contained"
        type="submit"
        disabled={!methods.formState.isValid}
        {...props}
      >
        { children }
      </Button>
    )
  }
