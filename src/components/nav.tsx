import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { Theme, Drawer, Divider, Button } from '@material-ui/core'
import * as Links from './links'
import { authSelectors } from '../store/index'
import { logout as logoutAction } from '../store/auth/actions'

const styles = (theme: Theme) => createStyles({
  space: {
    height: '60px'
  },
})

interface NavProps extends WithStyles<typeof styles> {
  loggedIn: boolean
  opened?: boolean
  onToggle?: (active: boolean) => void
  logout: () => void
}

interface NavState {
  opened: boolean
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

  logout = () => {
    this.props.logout()
  }
  

  adminLinks() {
    return this.props.loggedIn ?
      [
        (<Divider key="divider" />),
        (<Links.EditSermons key="edit" />),
        (<div key="space" style={({flex: '1'})}/>),
        (<Button key="logout" fullWidth color="secondary" onClick={this.logout} variant="contained">Logout</Button>)
      ] : []
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
        { this.adminLinks() }
      </Drawer>
    )
  }
}

const mapStateToProps = (state: any) => ({ loggedIn: authSelectors.loggedIn(state)() })
const mapDispatchToProps = (dispatch: Dispatch) => ({ logout: () => dispatch(logoutAction) })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Nav))
