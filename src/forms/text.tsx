import { TextField as MuiTextField } from '@mui/material'
import { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField'
import { FunctionComponent, ReactElement } from 'react'
import { FormElement } from './form'
import { DefaultSx } from './styles'

type TextFieldProps = FormElement<MuiTextFieldProps>

export const TextField: FunctionComponent<TextFieldProps> =
  ({ name, methods, options, ...props }) => {
    if (!methods) { throw new Error("Only use TextField as a direct child of Form or List") }

    const opts = props.required ? { ...options, required: true } : options
    const registration = methods.register(name, opts)

    if (['date', 'time'].includes(props.type || '')) {
      props.InputLabelProps = { ...props.InputLabelProps, shrink: true }
    }

    return (
      <MuiTextField
        sx={DefaultSx}
        name={name}
        {...props}
        inputProps={{...registration}}
      />
    )

  }

export type TextFieldElementType = ReactElement<TextFieldProps, typeof TextField>
