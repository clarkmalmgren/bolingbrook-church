import React, { FunctionComponent } from 'react'
import { createStyles, makeStyles } from '@material-ui/styles'

type Props = {}

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center'
    }
  }))

export const CardList: FunctionComponent<Props> =
  ({ children }) => {
    const classes = useStyles()

    return (
      <div className={classes.root}>
        { children }
      </div>
    )
  }

