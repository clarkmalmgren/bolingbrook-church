import { Typography, Fab, Icon } from '@material-ui/core'
import { Link, LinkProps } from 'react-router-dom'
import { createStyles, makeStyles } from '@material-ui/styles'
import * as React from 'react'
import Hero from '../components/hero'
import SermonList from '../components/sermon-list'
import { SecurePage } from './secure-page'

const styles = createStyles({
  header: {
    color: 'white'
  },

  new: {
    position: 'fixed',
    right: '20px',
    bottom: '20px',
  }
})

export const EditSermons: React.FunctionComponent<{}> = (props) => {
  const classes = makeStyles(styles)(props)
  const fabProps: any = {
    component: (lp: LinkProps) => (<Link to="/admin/sermons/new" {...lp} />)
  }

  return (
    <SecurePage>
      <Hero media="sermons" height={0.4} shade={0.4}>
        <Typography className={classes.header} variant="h1">Edit Sermons</Typography>
      </Hero>
      <SermonList linkRoot="/admin/sermons" all/>

      <Fab className={classes.new} variant="extended" color="secondary" {...fabProps}>
        <Icon>add</Icon>
        New
      </Fab>
    </SecurePage>
  )
}
