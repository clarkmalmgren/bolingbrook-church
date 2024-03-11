import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { auth } from './utils/Firebase'

const LocalStorageKey = 'firebase_auth'

export type AuthInfo = {
  email: string
  token: string
  expires: string
  name?: string
  photo?: string
}

// State information shared across all listeners
let info: AuthInfo | undefined = undefined
const authListeners: { [id: number]: () => void } = {}
let nextListenerId: number = 0

// Initialize from Local Storage
let stored: string | null = null
if (typeof localStorage !== 'undefined') {
  stored = localStorage.getItem(LocalStorageKey)
}
if (stored) {
  try {
    info = JSON.parse(stored)
  } catch {
    localStorage.removeItem(LocalStorageKey)
  }
}

async function login(): Promise<boolean> {
  if (info) {
    return false
  } else {
    let user: User | null = auth.currentUser
    if (!user) {
      try {
        const uc = await signInWithPopup(auth, new GoogleAuthProvider())
        user = uc.user
      } catch {
        return false
      }
    }

    const result = await user.getIdTokenResult(true)

    info = {
      email: (user.email as string),
      token: result.token,
      expires: result.expirationTime,
      name: user.displayName || undefined,
      photo: user.photoURL || undefined
    }

    localStorage.setItem(LocalStorageKey, JSON.stringify(info))

    // Make sure to call all the auth listeners to update them that auth info changed
    Object.values(authListeners).forEach(l => l())
    return true
  }
}

export function useAuthState(): AuthInfo | undefined {
  const [ , setX ] = useState(0)

  useEffect(() => {
    const listenerId = nextListenerId++
    authListeners[listenerId] = () => { setX( Math.random() ) }
    return () => { delete authListeners[listenerId] }
  }, [])

  return info
}

export function useLogin(): () => Promise<boolean> {
  return () => login()
}

export function useLogout(): () => void {
  return () => {
    if (info) {
      auth.signOut()
      info = undefined
      localStorage.removeItem(LocalStorageKey)
      // Make sure to call all the auth listeners to update them that auth info changed
      Object.values(authListeners).forEach(l => l())
    }
  }
}

export function useAuth(): AuthInfo | undefined {
  const [ , setX ] = useState(0)

  useEffect(() => {
    login().then(changed => {
      if (changed) { setX(Math.random()) }
    })
  }, [ ])

  return info
}
