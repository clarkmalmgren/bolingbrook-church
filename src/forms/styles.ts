import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'

export const styles = makeStyles((theme: Theme) => ({
  default: {
    minWidth: '250px !important',
    margin: '3px 10px !important',
    flex: '1 !important',

    [theme.breakpoints.down('xs')]: {
      margin: '3px 0',
      flex: '0 0 100%',
      minWidth: 'auto'
    }
  },

  full: {
    flex: '0 0 100%',
    margin: '10px 0'
  }
}))