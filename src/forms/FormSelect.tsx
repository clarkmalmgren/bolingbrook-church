'use client'

import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { FunctionComponent } from 'react'
import { useFormField } from './useFormField'

export type FormSelectProps = {
  id: string | string[]
  required?: boolean
  label: string
  disabled?: boolean
  options: (string | { value: string, label: string })[]
}

export const FormSelect: FunctionComponent<FormSelectProps> =
  ({ id, required, label, disabled, options }) => {
    const { value, update, flat } = useFormField(id)

    return (
      <FormControl margin="dense" size="small" fullWidth required={required} disabled={disabled}>
        <InputLabel>{label}</InputLabel>
        <Select
          label={label}
          defaultValue=""
          name={flat}
          required={required}
          disabled={disabled}
          value={value || ''}
          onChange={ (e) => update(e.target.value) }
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
