import { InputLabelProps, TextField } from '@mui/material'
import { FunctionComponent, ReactElement } from 'react'
import { KeyType } from './Form'
import { useFormField } from './useFormField'

type BaseFieldProps<T> = {
  id: KeyType
  required?: boolean
  label: string
  disabled?: boolean
  narrow?: boolean
  isValid?: (v: T) => boolean
  helperText?: string
}

type FormFieldProps<T> = BaseFieldProps<T> & {
  isValid: (v: T) => boolean
  type?: 'number' | 'date' | 'time'
  toValue: (v: string) => T
  multiline?: boolean
  InputLabelProps?: Partial<InputLabelProps>
}

function FormField<T>(props: FormFieldProps<T>): ReactElement<any, any> {
  const { id, toValue, isValid, required, type, narrow, ...rest } = props
  const { value, update, flat } = useFormField<T>(id, (v) => !required || isValid(v))

  const _update = (s: string) => {
    const value = toValue(s)
    update(value)
  }

  if (['date', 'time'].includes(type || '')) {
    rest.InputLabelProps = { ...props.InputLabelProps, shrink: true }
  }

  return (
    <TextField
      margin="dense"
      size="small"
      value={value || (type === 'number' ? 0 : '')}
      onChange={ (e) => _update(e.target.value) }
      id={flat}
      name={flat}
      required={required}
      type={type}
      fullWidth={!narrow}

      sx={ narrow ? { flex: 1, minWidth: 350 } : { } }

      {...rest}
    />
  )
}

const DefaultTextIsValid = (v: string) => !!v

export const TextFormField: FunctionComponent<BaseFieldProps<string> & { multiline?: boolean }> =
  ({ isValid, ...rest }) => <FormField toValue={s => s} isValid={isValid || DefaultTextIsValid} {...rest} />

const DefaultNumberIsValid = (v: number) => Number.isFinite(v)

export const NumberFormField: FunctionComponent<BaseFieldProps<number>> =
  ({ isValid, ...rest }) => <FormField type="number" toValue={s => +s} isValid={isValid || DefaultNumberIsValid} {...rest} />

export const DateFormField: FunctionComponent<BaseFieldProps<string>> =
  ({ isValid, ...rest }) => <FormField type="date" toValue={s => s} isValid={isValid || DefaultTextIsValid} {...rest} />

export const TimeFormField: FunctionComponent<BaseFieldProps<string>> =
  ({ isValid, ...rest }) => <FormField type="time" toValue={s => s} isValid={isValid || DefaultTextIsValid} {...rest} />
