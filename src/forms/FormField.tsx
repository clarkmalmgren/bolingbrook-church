import { InputLabelProps, TextField } from '@mui/material'
import { FunctionComponent, ReactElement } from 'react'
import { KeyType, useFormField } from './Form'

type BaseFieldProps<T> = {
  id: KeyType
  required?: boolean
  label: string
  disabled?: boolean
  isValid?: (v: T) => boolean
  helperText?: string
}

type FormFieldProps<T> = {
  id: KeyType
  required?: boolean
  label: string
  disabled?: boolean
  type?: 'number' | 'date' | 'time'
  toValue: (v: string) => T
  isValid: (v: T) => boolean
  helperText?: string
  multiline?: boolean
  InputLabelProps?: Partial<InputLabelProps>
}

function FormField<T>(props: FormFieldProps<T>): ReactElement<any, any> {
  const { id, toValue, isValid, required, type, ...rest } = props
  const { value, update, flat } = useFormField(id)

  const _update = (s: string) => {
    const value = toValue(s)
    const invalid = required && !isValid(value)
    update(value, invalid)
  }

  if (['date', 'time'].includes(type || '')) {
    rest.InputLabelProps = { ...props.InputLabelProps, shrink: true }
  }

  return (
    <TextField
      margin="dense"
      size="small"
      fullWidth
      value={value || (type === 'number' ? 0 : '')}
      onChange={ (e) => _update(e.target.value) }
      id={flat}
      name={flat}
      required={required}
      type={type}

      {...rest}
    />
  )
}

const DefaultTextIsValid = (v: string) => !!v

export const TextFormField: FunctionComponent<BaseFieldProps<string> & { multiline?: boolean }> =
  ({ id, required, label, isValid, disabled, helperText, multiline }) => {
    return (<FormField id={id} required={required} helperText={helperText} disabled={disabled} label={label} toValue={s => s} isValid={isValid || DefaultTextIsValid} multiline={multiline} />)
  }

const DefaultNumberIsValid = (v: number) => Number.isFinite(v)

export const NumberFormField: FunctionComponent<BaseFieldProps<number>> =
  ({ id, required, label, isValid, disabled, helperText }) => {
    return (<FormField id={id} required={required} helperText={helperText} disabled={disabled} label={label} type="number" toValue={s => +s} isValid={isValid || DefaultNumberIsValid} />)
  }

export const DateFormField: FunctionComponent<BaseFieldProps<string>> =
  ({ id, required, label, isValid, disabled, helperText }) => {
    return (<FormField id={id} required={required} helperText={helperText} disabled={disabled} label={label} type="date" toValue={s => s} isValid={isValid || DefaultTextIsValid} />)
  }

export const TimeFormField: FunctionComponent<BaseFieldProps<string>> =
  ({ id, required, label, isValid, disabled, helperText }) => {
    return (<FormField id={id} required={required} helperText={helperText} disabled={disabled} label={label} type="time" toValue={s => s} isValid={isValid || DefaultTextIsValid} />)
  }
