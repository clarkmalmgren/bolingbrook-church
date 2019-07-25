import * as React from 'react'
import { Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import Hero from '../components/hero'
import Page from '../components/page'
import SermonList from '../components/sermon-list'

const styles = createStyles({
  header: {
    color: 'white'
  }
})

const Sermons: React.FunctionComponent<{}> = (props) => {
  const classes = makeStyles(styles)(props)

    return (
      <Page>
        <Hero media="sermons" height={0.4} shade={0.4}>
          <Typography className={classes.header} variant="h1">Sermons</Typography>
        </Hero>
        <SermonList />
      </Page>
    )
}

export default Sermons
