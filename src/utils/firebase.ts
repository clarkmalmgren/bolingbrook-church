import { initializeApp, FirebaseApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics, logEvent, Analytics as FirebaseAnalytics } from 'firebase/analytics'

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

const app: FirebaseApp = initializeApp(config)
const analytics: FirebaseAnalytics = getAnalytics(app)
const auth = getAuth(app)

export type App = FirebaseApp
export type Analytics = FirebaseAnalytics

logEvent(analytics, 'session_start')

export { app, analytics, auth }
