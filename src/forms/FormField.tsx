import { TextField } from '@mui/material'
import { FunctionComponent, ReactElement } from 'react'
import { useFormField } from './Form'

type BaseFieldProps<T> = {
  id: string | string[]
  required?: boolean
  label: string
  disabled?: boolean
  isValid?: (v: T) => boolean
}

type FormFieldProps<T> = {
  id: string | string[]
  required?: boolean
  label: string
  disabled?: boolean
  type?: 'number' | 'date'
  toValue: (v: string) => T
  isValid: (v: T) => boolean
}

function FormField<T>(props: FormFieldProps<T>): ReactElement<any, any> {
  const { id, required, label, toValue, type, disabled, isValid } = props
  const { value, update, flat } = useFormField(id)

  const _update = (s: string) => {
    const value = toValue(s)
    const invalid = required && !isValid(value)
    update(value, invalid)
  }

  return (
    <TextField
      margin="dense"
      size="small"
      fullWidth
      required={required}
      label={label}
      id={flat}
      name={flat}
      value={value || (type === 'number' ? 0 : '')}
      type={type}
      disabled={disabled}
      onChange={ (e) => _update(e.target.value) }
    />
  )
}

const DefaultTextIsValid = (v: string) => !!v

export const TextFormField: FunctionComponent<BaseFieldProps<string>> =
  ({ id, required, label, isValid, disabled }) => {
    return (<FormField id={id} required={required} disabled={disabled} label={label} toValue={s => s} isValid={isValid || DefaultTextIsValid} />)
  }

const DefaultNumberIsValid = (v: number) => Number.isFinite(v)

export const NumberFormField: FunctionComponent<BaseFieldProps<number>> =
  ({ id, required, label, isValid, disabled }) => {
    return (<FormField id={id} required={required} disabled={disabled} label={label} type="number" toValue={s => +s} isValid={isValid || DefaultNumberIsValid} />)
  }

export const DateFormField: FunctionComponent<BaseFieldProps<string>> =
  ({ id, required, label, isValid, disabled }) => {
    return (<FormField id={id} required={required} disabled={disabled} label={label} type="date" toValue={s => s} isValid={isValid || DefaultTextIsValid} />)
  }
