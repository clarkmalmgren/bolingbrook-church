import { FunctionComponent } from 'react'
import { useFormField } from './Form'
import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'

export type FormOption = string | { value: string, label: string }

export type FormCheckboxesProps = {
  id: string | string[]
  required?: boolean
  label: string
  disabled?: boolean
  options: FormOption[]
}

function optionValue(o: FormOption): string {
  return typeof o === 'string' ? o : o.value
}

export const FormCheckboxes: FunctionComponent<FormCheckboxesProps> =
  ({ id, required, label, disabled, options }) => {
    const { value, update } = useFormField<string[]>(id)
    const checks = options.map(optionValue).map(o => value?.includes(o))

    function onChange(index: number, checked: boolean): void {
      const nextChecks = [ ...checks ]
      nextChecks[index] = checked

      const next = options.map(optionValue).filter((v, i) => nextChecks[i])
      update(next, next.length === 0 && required)
    }

    return (
      <>
        <Typography variant="h3">{label}</Typography>
        { options.map((o, i) =>
          <FormControlLabel
            sx={{
              minWidth: { xs: 'auto', sm: '250px !important' },
              margin: { xs: '3px 0', sm: '3px 10px !important' },
              flex: { xs:'0 0 100%', sm: '1 !important' }
            }}
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