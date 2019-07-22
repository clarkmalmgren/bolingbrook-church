import { Action } from 'redux'
import { GoogleToken } from './token';

export const SAVE_LOGIN: string = "SAVE LOGIN"
export const LOGOUT: string = "LOGOUT"

export interface SaveLoginAction extends Action<typeof SAVE_LOGIN> {
  readonly token: GoogleToken
}

export interface LogoutAction extends Action<typeof LOGOUT> {}

export function save(token: GoogleToken): SaveLoginAction {
  return { token, type: SAVE_LOGIN}
}

export const logout: LogoutAction = { type: LOGOUT }

export type AuthActions = SaveLoginAction | LogoutAction
