import { FunctionComponent, useContext } from 'react'
import { FormContext } from './Form'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export type FormSelectProps = {
  id: string
  required?: boolean
  label: string
  disabled?: boolean
  options: (string | { value: string, label: string })[]
}

export const FormSelect: FunctionComponent<FormSelectProps> =
  ({ id, required, label, disabled, options }) => {
    const { data, setValue } = useContext(FormContext)

    return (
      <FormControl margin="dense" size="small" fullWidth required={required} disabled={disabled}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          defaultValue=""
          name={id}
          required={required}
          disabled={disabled}
          value={data[id]?.value || ''}
          onChange={ (e) => setValue(id, e.target.value) }
        >
          { options.map(o => {
            if (typeof o === 'string') {
              return <MenuItem key={o} value={o}>{o}</MenuItem>
            } else {
              return <MenuItem key={o.value} value={o.value}>{o.label}</MenuItem>
            }
          })}
        </Select>
      </FormControl>
    )
  }
