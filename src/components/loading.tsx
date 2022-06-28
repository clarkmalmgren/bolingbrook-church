import React, { FunctionComponent } from 'react'
import { CircularProgress } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => createStyles({
  outer: {
    width: '100%',
    textAlign: 'center',
    margin: '0',
  },
  
  inner: {
    position: 'relative',
    top: '50%',
    transform: 'translateY(-50%)'
  }
}))

type Props = {
  height?: string
}

export const Loading: FunctionComponent<Props> =
  ({ height }) => {
    const classes = useStyles()
    const calculatedHeight = height ? height : '300px'

    return (
      <div className={classes.outer} style={{height: calculatedHeight}}>
        <div className={classes.inner}>
          <CircularProgress />
        </div>
      </div>
    )
  }
