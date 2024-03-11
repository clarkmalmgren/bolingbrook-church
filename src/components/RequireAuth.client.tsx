'use client'

import { useAuthState } from '@/services/FirebaseAuthService'
import { FunctionComponent, PropsWithChildren } from 'react'
import { Login } from './Login'

const RequireAuthClient: FunctionComponent<PropsWithChildren<{}>> =
  ({ children }) => {
    const auth = useAuthState()
    return (
      <div suppressHydrationWarning>
        { auth ? children : <Login /> }
      </div>
    )
  }

export default RequireAuthClient
