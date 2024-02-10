import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'
import { FunctionComponent, ReactElement, useState } from 'react'
import { FormElement } from './form'
import { DefaultSx } from './styles'

export type CheckboxesOption = string | { id: string, label: string }

export type CheckboxesProps = FormElement<{
  name: string
  values: CheckboxesOption[]
}>

export const Checkboxes: FunctionComponent<CheckboxesProps> =
  ({ name, methods, values }) => {
    const [ selected, setSelected ] = useState<string[]>([])
    if (!methods) { throw new Error("Only use Checkboxes as a direct child of Form or List") }

    const childOnChange = (id: string, checked: boolean) => {
      const rest = selected.filter(i => i !== id)
      const updated = checked ? [ id, ...rest ] : rest
      if (selected.length !== updated.length) {
        setSelected(updated)
        methods.setValue(name, updated)
      }
    }

    const renderChild = (child: CheckboxesOption) => {
      const [ id, label ] = typeof child === 'string' ? [ child, child ] : [ child.id, child.label ]
      const checked = selected.includes(id)

      return (
        <FormControlLabel
          sx={DefaultSx}
          key={id}
          control={<MuiCheckbox value={id} checked={checked} onChange={(event) => childOnChange(id, event.target.checked)} />}
          label={label}
        />
      )
    }

    return (
      <>{values.map(child => renderChild(child))}</>
    )
  }

export type CheckboxesElementType = ReactElement<CheckboxesProps, typeof Checkboxes>
