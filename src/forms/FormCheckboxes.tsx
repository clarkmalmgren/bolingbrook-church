'use client'

import { Checkbox, FormControlLabel, Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { nonEmptyArray, useFormField } from './useFormField'

export type FormOption = string | { value: string, label: string }

export type FormCheckboxesProps = {
  id: string | string[]
  required?: boolean
  label: string
  disabled?: boolean
  narrow?: boolean
  options: FormOption[]
}

function optionValue(o: FormOption): string {
  return typeof o === 'string' ? o : o.value
}

export const FormCheckboxes: FunctionComponent<FormCheckboxesProps> =
  ({ id, required, label, disabled, narrow, options }) => {
    const { value, update } = useFormField<string[]>(id, nonEmptyArray(required))
    const checks = options.map(optionValue).map(o => value?.includes(o))

    function onChange(index: number, checked: boolean): void {
      const nextChecks = [ ...checks ]
      nextChecks[index] = checked

      const next = options.map(optionValue).filter((v, i) => nextChecks[i])
      update(next)
    }

    return (
      <>
        <Typography variant="h3" flex="100%" mt={2} >{label}{ required ? ' *' : '' }</Typography>
        { options.map((o, i) =>
          <FormControlLabel
            sx={ narrow ? { flex: '1', minWidth: 350 } : { flex: '100%' } }
            key={i}
            label={typeof o === 'string' ? o : o.label}
            control={
              <Checkbox
                value={optionValue(o)}
                checked={checks[i] || false}
                onChange={(e) => onChange(i, e.target.checked)}
                disabled={ disabled }
              />
            }
          />
        )}
      </>
    )
  }
