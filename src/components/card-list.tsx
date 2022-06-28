import { FunctionComponent, PropsWithChildren } from 'react'
import { createStyles, makeStyles } from '@mui/styles'

type Props = {}

const useStyles = makeStyles(
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'center'
    }
  }))

export const CardList: FunctionComponent<PropsWithChildren<Props>> =
  ({ children }) => {
    const classes = useStyles()

    return (
      <div className={classes.root}>
        { children }
      </div>
    )
  }

