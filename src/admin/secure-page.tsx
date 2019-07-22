import * as React from 'react'
import { connect } from 'react-redux'
import Page from '../components/page'
import { authSelectors } from '../store/index'
import { Redirect } from 'react-router';

interface SecurePageProps {
  loggedIn: boolean
  className?: string
}

const BaseSecurePage: React.FunctionComponent<SecurePageProps> =
  (props) => props.loggedIn ?
    (<Page className={props.className}>{props.children}</Page>) :
    (<Redirect to={`/admin/login#${location.pathname}`} />)

const mapStateToProps = (state: any) =>
  ({ loggedIn: authSelectors.loggedIn(state)() })

export const SecurePage = connect(mapStateToProps)(BaseSecurePage)