import { FunctionComponent, useState, MouseEvent } from 'react'
import { AppBar, Toolbar, IconButton, Icon, useTheme, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './button'
import { Nav } from './nav'
import { Logo } from '../assets/images/Logo'
import { TextLogo } from '../assets/images/TextLogo'

export const Header: FunctionComponent<{}> =
  () => {
    const theme = useTheme()
    const navigate = useNavigate()
    const [ opened, setOpened ] = useState(false)
    const [ clickCount, setClickCount ] = useState(0)
    
    const onHomeClick = (event: MouseEvent) => {
      if (clickCount >= 10) {
        event.preventDefault()
        navigate('/admin/login')
        setClickCount(0)
      } else {
        setClickCount(clickCount + 1)
      }
    }

    return (
      <AppBar position="relative" >
        <Toolbar sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '5px 12px !important',
          backgroundColor: 'white',
          left: '0',
          right: '0',
          height: '50px',
          top: '0'
        }}>
          <Box
            component={Link}
            sx={{color: 'black', display: 'flex', alignItems: 'center', justifySelf: 'center'}}
            to="/"
            onClick={onHomeClick}
          >
            <Logo color={theme.palette.primary.main} />
            <TextLogo color="black" />
          </Box>

          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 'auto',
            justifyContent: 'center'
          }}>
            <Button sx={{ color: 'black !important', padding: '0 8px' }} variant="text" link="/visit">Visit</Button>
            <Button sx={{ color: 'black !important', padding: '0 8px' }} variant="text" link="/sermons">Sermons</Button>
            <Button sx={{ color: 'black !important', padding: '0 8px' }} variant="text" link="/connect">Connect</Button>
          </Box>

          <div>
            <Button sx={{ color: 'black !important' }} variant="contained" color="secondary" link="/giving">Give</Button>
            <IconButton onClick={() => setOpened(true)} sx={{ml: 1}}>
              <Icon>menu</Icon>
            </IconButton>
          </div>

          <Nav opened={opened} onToggle={setOpened} ></Nav>
        </Toolbar>
      </AppBar>
    )
  }
