import { FunctionComponent } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { Theme, Drawer, Divider, Button, IconButton, Icon } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import * as Links from './links'
import { authSelectors } from '../store/index'
import { logout as logoutAction } from '../store/auth/actions'
import { DynamicLinks } from '../contentful/dynamic-links'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    space: {
      height: '74px',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginRight: theme.spacing(1)
    },
  }))

type NavProps = {
  loggedIn: boolean
  opened?: boolean
  onToggle?: (active: boolean) => void
  logout: () => void
}

const Nav: FunctionComponent<NavProps> =
  ({ loggedIn, opened, onToggle, logout }) => {
    const classes = useStyles()
    function close() {
      if (onToggle) { onToggle(false) }
    }
    
    function adminLinks() {
      return loggedIn ?
        [
          (<Divider key="divider" />),
          (<Links.EditSermons key="edit" />),
          (<div key="space" style={({flex: '1'})}/>),
          (<Button key="logout" fullWidth color="secondary" onClick={logout} variant="contained">Logout</Button>)
        ] : []
    }

    return (
      <Drawer anchor="right" open={opened} onClose={() => close()} onClick={() => close()}>
        <div className={classes.space}>
          <IconButton onClick={() => close()}>
            <Icon>close</Icon>
          </IconButton>
        </div>
        
        <Divider />

        <Links.Home />

        <Links.OurStory />
        <Links.MeetUs />
        <Links.GetConnected />
        <Links.Sermons />
        <Links.Giving />
        <Links.Location />
        
        <Divider />
        
        <Links.Serve />
        <Links.Newsletter />
        <Links.FriendsFam />
        <Links.ShopBC />
        <Links.Podcast />

        <DynamicLinks display="Side Bar" />
        { adminLinks() }
      </Drawer>
    )
  }

const mapStateToProps = (state: any) => ({ loggedIn: authSelectors.loggedIn(state)() })
const mapDispatchToProps = (dispatch: Dispatch) => ({ logout: () => dispatch(logoutAction) })

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
