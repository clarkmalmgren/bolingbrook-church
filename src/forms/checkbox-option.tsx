import { Checkbox as MuiCheckbox, FormControlLabel } from '@mui/material'
import { FunctionComponent } from 'react'
import { FieldProps, partialNoId } from './props'
import { styles } from './styles'

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
  