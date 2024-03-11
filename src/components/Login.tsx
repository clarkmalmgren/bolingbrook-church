'use client'

import { Box, Paper, Typography } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import { useLogin } from '../services/FirebaseAuthService'
import { GoogleLoginButton } from './GoogleLoginButton'

export const Login: FunctionComponent<PropsWithChildren<{}>> =
  ({ children }) => {
    const login = useLogin()

    return (
      <Paper sx={{ maxWidth: 500, ml: 'auto', mr: 'auto', p: 2 }}>
        <Typography variant="h4">Login</Typography>
        <Typography sx={{ mt: 2, mb: 2 }}>
          { children }
        </Typography>
        <Box sx={{textAlign: 'right'}}>
          <GoogleLoginButton onClick={login} />
        </Box>
      </Paper>
    )
  }