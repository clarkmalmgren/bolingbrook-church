import * as React from 'react'
import { Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import Page from '../components/page'
import Content from '../components/content'
import Hero from '../components/hero'

const styles = createStyles({
  header: {
    color: 'white'
  }
})

export default (props: {}) => {
    const classes = makeStyles(styles)(props)

    return (
      <Page>
        <Hero media="about" height={0.3} shade={0.4}>
          <Typography className={classes.header} variant="h1">Our Story</Typography>
        </Hero>
        <Content name="About" />
      </Page>
    )
  }
