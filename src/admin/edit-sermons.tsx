import { Fab, Icon } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import SermonList from '../components/sermon-list'
import { ContentfulHero } from '../contentful/hero'
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
      <ContentfulHero name="sermons" />
      <SermonList linkRoot="/admin/sermons" all/>

      <Fab className={classes.new} variant="extended" color="secondary" {...fabProps}>
        <Icon>add</Icon>
        New
      </Fab>
    </SecurePage>
  )
}
