'use client'

import { useAuthState, useLogout } from '@/services/FirebaseAuthService'
import { Button } from '@mui/material'
import { FunctionComponent } from 'react'

export const Logout: FunctionComponent<{}> =
  () => {
    const auth = useAuthState()
    const logout = useLogout()

    return auth ? <Button onClick={() => logout()}>Logout</Button> : null
  }

export default Logout
