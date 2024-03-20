import { FunctionComponent, ReactElement } from 'react'
import { useFormField } from './Form'
import { FormControlLabel, Switch } from '@mui/material'

type FormSwitchProps = {
  id: string | string[]
  label: string
  required?: boolean
  disabled?: boolean
}

export const FormSwitch: FunctionComponent<FormSwitchProps> =
  ({ id, label, required, disabled }) => {
    const { value, update, flat } = useFormField<boolean | undefined>(id)

    return (
      <FormControlLabel
        disabled={disabled}
        required={required}
        label={label}
        control={<Switch checked={!!value} onChange={(_, b) => update(b)} />}
      />
    )
  }
