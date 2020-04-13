import * as React from 'react'
import { connect } from 'react-redux'
import { authSelectors } from '../store/index'
import { Redirect } from 'react-router';

interface SecurePageProps {
  loggedIn: boolean
  className?: string
  children: React.ReactNode
}

const BaseSecurePage: React.FunctionComponent<SecurePageProps> =
  (props) => props.loggedIn ?
    (<div className={props.className}>{props.children}</div>) :
    (<Redirect to={`/admin/login#${window.location.pathname}`} />)

const mapStateToProps = (state: any) =>
  ({ loggedIn: authSelectors.loggedIn(state)() })

export const SecurePage = connect(mapStateToProps)(BaseSecurePage)
