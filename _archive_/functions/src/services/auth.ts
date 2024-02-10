import { info } from 'firebase-functions/lib/logger'
import { database, auth } from 'firebase-admin'
import { init } from './firebase-init'

export enum AuthRejection {
  Unauthorized = 401,
  Forbidden = 403
}

export async function isAdmin(authHeader: string | undefined): Promise<AuthRejection | undefined> {
  if (!authHeader || !authHeader.match(/^Bearer /i)) {
    return AuthRejection.Unauthorized
  }

  const bearer = authHeader.slice(7)
  init()

  try {
    const decoded = await auth().verifyIdToken(bearer)
    info(`Was able to decode bearer token to uid: ${decoded.uid}`)

    if (!decoded.email || !decoded.email_verified) {
      info(`Missing email or verification of email`)
      return AuthRejection.Unauthorized
    }
    info(`Looking up: ${decoded.email} at 'users/${decoded.email.replace(/\./g, '_')}'`)

    const role = await database().ref(`users/${decoded.email.replace(/\./g, '_')}`).once('value')
    if (role.val() === 'admin') {
      return undefined
    } else {
      return AuthRejection.Forbidden
    }
  } catch (e) {
    info('Failed to process authorization header', e)
    return AuthRejection.Unauthorized
  }

}