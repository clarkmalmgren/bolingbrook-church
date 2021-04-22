import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/analytics'

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

const app: firebase.app.App = firebase.initializeApp(config)
const analytics: firebase.analytics.Analytics = firebase.analytics()
const auth = firebase.auth

export type App = firebase.app.App
export type Analytics = firebase.analytics.Analytics

analytics.logEvent('session_start')

export { app, analytics, auth }
