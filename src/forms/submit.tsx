import React, { FunctionComponent } from 'react'
import { Button } from '@mui/material'
import { FieldProps, partialNoId } from './props'
import { styles } from './styles'

interface SubmitProps extends FieldProps<void> {
  disabled?: boolean
  children: JSX.Element | JSX.Element[] | string
}

const Submit: FunctionComponent<SubmitProps> =
  (props) => (
    <Button
      disabled={props.disabled}
      key={props.id}
      className={styles(props).full}
      variant="contained"
      onClick={() => props.onSubmit()}>{props.children}</Button>
  )

export default partialNoId(Submit)
