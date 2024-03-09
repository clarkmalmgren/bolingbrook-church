'use client'

import { AppBar, Box, Toolbar, useTheme } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Logo } from '../../../public/Logo'
import { TextLogo } from '../../../public/TextLogo'

export const AdminHeader: FunctionComponent<{}> =
  () => {
    const theme = useTheme()

    return (
      <AppBar position="relative">
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
        </Toolbar>
      </AppBar>
    )
  }