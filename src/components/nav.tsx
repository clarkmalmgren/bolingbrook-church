import React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { Theme, Drawer, Divider, Icon, Link } from '@material-ui/core'
import * as Links from './links'


interface NavState {
  opened: boolean
}

const styles = (theme: Theme) => createStyles({
  space: {
    height: '60px'
  },
})

interface NavProps extends WithStyles<typeof styles> {
  opened?: boolean
  onToggle?: (active: boolean) => void
}

class Nav extends React.PureComponent<NavProps, NavState> {

  constructor(props: NavProps) {
    super(props)
    this.state = { opened: !!props.opened}
  }

  componentWillReceiveProps(props: NavProps) {
    if (this.state.opened != props.opened) {
      this.setState(() => ({ opened: !!props.opened }))
    }
  }

  handleClick = () => {
    this.setState(state => {
      const opened = !state.opened
      if (this.props.onToggle) {
        this.props.onToggle(opened)
      }
      return { opened : opened }
    })
  }

  close = () => () => {
    this.setState(state => {
      if (this.props.onToggle) {
        this.props.onToggle(false)
      }
      return { opened: false }
    })
  }

  render() {
    return (
      <Drawer anchor="right" open={this.state.opened} onClose={this.close()}>
        <div className={this.props.classes.space} />
        
        <Divider />

        <Links.Home />

        <Links.OurStory />
        <Links.GetConnected />
        <Links.Sermons />
        <Links.Giving />
        <Links.Location />
        
        <Divider />
        
        <Links.Serve />
        <Links.Newsletter />
        <Links.FriendsFam />
      </Drawer>
    )
  }
}

export default withStyles(styles)(Nav)
