import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { FunctionComponent } from 'react'
import { FieldProps, partialNoId } from './props'

const styles = makeStyles({
  root: {
    flex: '0 0 100%',
    margin: '15px 0'
  },
})

interface HeaderProps extends FieldProps<void> {
  variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
}

const Header: FunctionComponent<HeaderProps> =
  (props) => (
    <Typography
      key={props.id}
      className={styles(props).root}
      variant={props.variant}>{props.children}</Typography>
  )

export default partialNoId(Header)
