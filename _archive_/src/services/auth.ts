import { GoogleToken } from '../models/token'
import { Option } from '../utils/option'
import { auth } from '../utils/firebase'
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useEffect, useState } from 'react'

export type AuthActions = {
  login: () => Promise<GoogleToken>
  logout: () => Promise<void>
}

export function useAuthActions(): AuthActions {
  const auth = Auth.singleton
  return { login: () => auth.login(), logout: () => auth.logout() }
}

export function useIsLoggedIn(): boolean {
  return typeof useAuthToken() !== 'undefined'
}

export function useAuthToken(): GoogleToken | undefined {
  const [ , setX ] = useState(0)
  useEffect(() => Auth.singleton.listen(() => setX(Math.random())), [])
  return Auth.singleton.token
}

const LOCAL_STORAGE_KEY = 'AUTH_TOKEN'


const expiresWithinAnHour = (token: GoogleToken) => {
  const hourFromNowInSeconds = new Date().getTime() / 1000 + 3600
  return token.expiresAt < hourFromNowInSeconds
}

class Auth {

  static readonly singleton: Auth =
    new Auth(
      Option(localStorage.getItem(LOCAL_STORAGE_KEY))
        .map(JSON.parse)
        .noneIf(expiresWithinAnHour)
        .getOrUndefined()
    )

  private _token: GoogleToken | undefined
  private listeners: { [id: number]: () => void } = {}
  private nextListenerId: number = 0

  private constructor (init: GoogleToken | undefined) {
    this._token = init
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this._token))
  }

  private deleteFromLocalStorage(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
  }

  listen(onChange: () => void): () => void {
    const id = this.nextListenerId++
    this.listeners[id] = onChange
    return () => { delete this.listeners[id] }
  }

  private updateListeners(): void {
    Object.values(this.listeners).forEach(l => l())
  }

  async login(): Promise<GoogleToken> {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)

    this._token = {
      tokenId: await auth.currentUser?.getIdToken() || '',
      expiresAt: new Date().getTime() / 1000 + 7200,

      googleId: result.user?.uid || '',
      email: result.user?.email || '',
      name: result.user?.email || ''
    }

    this.saveToLocalStorage()
    this.updateListeners()

    return this._token
  }

  async logout(): Promise<void> {
    await signOut(auth)

    this._token = undefined
    this.deleteFromLocalStorage()
    this.updateListeners()
  }

  get token(): GoogleToken | undefined {
    return this._token
  }
}
