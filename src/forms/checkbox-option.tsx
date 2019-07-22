import React, { FunctionComponent } from 'react'
import { Checkbox as MuiCheckbox, FormControlLabel } from '@material-ui/core'
import { styles } from './styles'
import { FieldProps, partialNoId } from './props'

export interface CheckboxOptionProps extends FieldProps<boolean> {
  children: string
}

const CheckboxOption: FunctionComponent<CheckboxOptionProps> =
  (props) => (
    <FormControlLabel className={styles(props).default} key={props.children}
      control={
        <MuiCheckbox
          checked={props.value}
          onChange={(event) => props.onChange(event.target.checked)}
          value={props.children} />
      } label={props.children}
    />
  )

export default partialNoId(CheckboxOption)
  