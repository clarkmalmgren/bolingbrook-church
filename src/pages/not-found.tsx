import * as React from 'react'
import Page from '../components/page'
import { Typography } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles';

const styles = createStyles({
  root: {}
})

interface NotFoundProps extends WithStyles<typeof styles> {}

interface NotFoundState {}


class NotFound extends React.PureComponent<NotFoundProps, NotFoundState> {

  render() {
    const { classes } = this.props
    
    return (
      <Page>
        <Typography variant="h1">Oops! That page can’t be found.</Typography>
        <Typography>
          It looks like nothing was found at this location. Maybe try one of the links from the menu.
          Let's take this as a moment to reflect that this error and all errors in our lives are forgiven,
          paid for, and covered by the grace of Our Lord, Jesus Christ.
        </Typography>

      </Page>
    )
  }
}

export default withStyles(styles)(NotFound)
