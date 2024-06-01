'use client'

import { FormControlLabel, Switch } from '@mui/material'
import { FunctionComponent } from 'react'
import { useFormField } from './useFormField'

type FormSwitchProps = {
  id: string | string[]
  label: string
  required?: boolean
  disabled?: boolean
}

export const FormSwitch: FunctionComponent<FormSwitchProps> =
  ({ id, label, required, disabled }) => {
    const { value, update } = useFormField<boolean | undefined>(id)

    return (
      <FormControlLabel
        disabled={disabled}
        required={required}
        label={label}
        control={<Switch checked={!!value} onChange={(_, b) => update(b)} />}
      />
    )
  }
