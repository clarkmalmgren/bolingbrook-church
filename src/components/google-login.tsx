import React, { FunctionComponent } from 'react'
import { Button } from '@material-ui/core'
import { GoogleToken } from '../store/auth/token'

type Props = {
  className?: string
  onSuccess: (token: GoogleToken) => void
  onFailure: (e: Error) => void
}

// Global state to indicate whether or not we are initialized
let initialized = false

export const GoogleLogin: FunctionComponent<Props> =
  ({ className, onSuccess, onFailure }) => {

    async function login() {
      try {
        // Load firebase via code-splitting because it is huge
        const firebase = await import('../utils/firebase')

        if (!initialized) {
          firebase.initializeApp({
            apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
            authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
            projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
            storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.REACT_APP_FIREBASE_APP_ID
          })

          initialized = true
        }

        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await firebase.auth().signInWithPopup(provider)
        const creds = result.credential as firebase.auth.OAuthCredential

        const token = {
          accessToken: creds.accessToken || '',
          tokenId: await firebase.auth().currentUser?.getIdToken() || '',
          expiresAt: new Date().getTime() / 1000 + 7200,

          googleId: result.user?.uid || '',
          email: result.user?.email || '',
          name: result.user?.email || ''
        }

        onSuccess(token)
      } catch (e) {
        onFailure(e)
      }
    }

    return (
      <Button className={className} onClick={login} variant="contained">
        <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }}><g fill="#000" fill-rule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg>
        Sign in with Google
      </Button>
    )
  }