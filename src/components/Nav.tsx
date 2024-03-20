import { useAuthState, useLogout } from '@/services/FirebaseAuthService'
import { Box, Button, Divider, Drawer, Icon, IconButton, useTheme } from '@mui/material'
import { FunctionComponent } from 'react'
import * as Links from './MenuLink'

type NavProps = {
  opened?: boolean
  onToggle?: (active: boolean) => void
}

export const Nav: FunctionComponent<NavProps> =
  ({ opened, onToggle }) => {
    const logout = useLogout()
    const loggedIn = !!useAuthState()
    const theme = useTheme()

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
        <Box sx={{
          height: '74px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          marginRight: theme.spacing(1)
        }}>
          <IconButton onClick={() => close()}>
            <Icon>close</Icon>
          </IconButton>
        </Box>
        
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

        { adminLinks() }
      </Drawer>
    )
  }
