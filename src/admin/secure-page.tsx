import { FunctionComponent, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import { useIsLoggedIn } from '../services/auth'

export const SecurePage: FunctionComponent<PropsWithChildren<{}>> =
  ({ children }) => {
    const loggedIn = useIsLoggedIn()
    return loggedIn ? (<div>{children}</div>) : (<Navigate to={`/admin/login#${window.location.pathname}`} />)
  }
