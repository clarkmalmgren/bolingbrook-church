import React, { FunctionComponent } from 'react'
import { createStyles, withStyles, WithStyles, CircularProgress } from '@material-ui/core'

const styles = createStyles({
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
})

interface Props extends WithStyles<typeof styles> {
  height?: string
}

const UnstyledLoading: FunctionComponent<Props> =
  ({height, classes}) => {
    const calculatedHeight = height ? height : '300px'

    return (
      <div className={classes.outer} style={{height: calculatedHeight}}>
        <div className={classes.inner}>
          <CircularProgress />
        </div>
      </div>
    )
  }

export const Loading = withStyles(styles)(UnstyledLoading)
