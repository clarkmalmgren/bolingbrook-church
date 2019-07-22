import React, { FunctionComponent } from 'react';
import { TextField as MuiTextField } from '@material-ui/core'
import { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField'
import { FieldProps, partial } from './props'
import { styles } from './styles'

interface TextFieldProps extends FieldProps<string> {
  disabled?: boolean
  autoComplete?: string
  required?: boolean
  dataType?: string
  multiline?: boolean
  rowsMax?: number
  children: string
}

const TextField: FunctionComponent<TextFieldProps> =
  (props) => {
    const muiProps: MuiTextFieldProps = {
      id: props.id,
      label: props.children,
      className: styles(props).default,
      value: props.value || '',
      disabled: props.disabled,
      required: props.required,
      autoComplete: props.autoComplete,
      type: props.dataType,
      multiline: props.multiline,
      rowsMax: props.rowsMax
    }

    if (props.dataType == "date" || props.dataType == "time") {
      muiProps.InputLabelProps = { shrink: true }
    }

    return (
      <MuiTextField
        key={props.id}
        onChange={(event) => { props.onChange(event.target.value) }}
        {...muiProps}
      />
    )
  }

export default partial(TextField)
