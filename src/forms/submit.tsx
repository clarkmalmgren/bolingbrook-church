import React, { FunctionComponent } from 'react'
import { Button } from '@material-ui/core'
import { FieldProps, partialNoId } from './props'
import { styles } from './styles'

interface SubmitProps extends FieldProps<void> {
  children: JSX.Element | JSX.Element[] | string
}

const Submit: FunctionComponent<SubmitProps> =
  (props) => (
    <Button
      key={props.id}
      className={styles(props).full}
      variant="contained"
      onClick={() => props.onSubmit()}>{props.children}</Button>
  )

export default partialNoId(Submit)
