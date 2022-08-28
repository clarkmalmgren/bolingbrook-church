import { SAVE_LOGIN, LOGOUT, SaveLoginAction, AuthActions } from './actions'
import { Reduxer } from '../reduxer'
import { GoogleToken } from './token'
import { readFromLocalStorage, saveToLocalStorage, deleteFromLocalStorage } from './effects'

export interface State {
  loggedIn: boolean
  credentials?: GoogleToken
}

const initialState: State = 
  readFromLocalStorage()
    .map(token => {
      if (token.expiresAt > new Date().getTime()) {
        return { loggedIn: true, token }
      } else {
        return { loggedIn: false }
      }
    })
    .getOrElse({ loggedIn: false })

export class AuthReduxer implements Reduxer<State, AuthActions> {

  initialState = initialState

  reducer(state: State = initialState, action: AuthActions) {
    switch(action.type) {
      case SAVE_LOGIN:
        const saveAction = action as SaveLoginAction
        saveToLocalStorage(saveAction.token)
        return { loggedIn: true, credentials: saveAction.token }

      case LOGOUT:
        deleteFromLocalStorage()
        return {
          loggedIn: false,
          credentials: undefined
        }
        
      default:
        return state
    }
  }

  selectors = {

    loggedIn: (state: State) => () => state.loggedIn,

    credentials: (state: State) => () => state.credentials

  }
}

