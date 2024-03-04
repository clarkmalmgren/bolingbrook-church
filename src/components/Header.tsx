'use client'

import { FunctionComponent, useState } from 'react'
import { AppBar, Button as MuiButton, Toolbar, IconButton, Icon, useTheme, Box } from '@mui/material'
import { Nav } from './Nav'
import { Logo } from '../../public/Logo'
import { TextLogo } from '../../public/TextLogo'
import Link from 'next/link'
import { Button } from './Button'

export const Header: FunctionComponent<{}> =
  () => {
    const theme = useTheme()
    const [ opened, setOpened ] = useState(false)

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
            href="/"
          >
            <Logo color={theme.palette.primary.main} />
            <TextLogo color="black" />
          </Box>

          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            flex: 'auto',
            justifyContent: 'center'
          }}>
            <MuiButton sx={{ color: 'black !important', padding: '0 8px' }} variant="text" href="/visit">Visit</MuiButton>
            <MuiButton sx={{ color: 'black !important', padding: '0 8px' }} variant="text" href="/sermons">Sermons</MuiButton>
            <MuiButton sx={{ color: 'black !important', padding: '0 8px' }} variant="text" href="/connect">Connect</MuiButton>
          </Box>

          <div>
            <Button link="/giving" size="small">Give</Button>
            <IconButton onClick={() => setOpened(true)} sx={{ml: 1}}>
              <Icon>menu</Icon>
            </IconButton>
          </div>

          <Nav opened={opened} onToggle={setOpened} ></Nav>
        </Toolbar>
      </AppBar>
    )
  }
