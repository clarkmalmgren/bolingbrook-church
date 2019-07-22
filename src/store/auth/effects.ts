import { GoogleToken } from './token'
import { Option } from '../../utils/option'

const KEY = 'AUTH_TOKEN'

const expiresWithinAnHour = (token: GoogleToken) => {
  const hourFromNowInSeconds = new Date().getTime() / 1000 + 3600
  return token.expiresAt < hourFromNowInSeconds
}

export const readFromLocalStorage: () => Option<GoogleToken> =
  () =>
    Option(localStorage.getItem(KEY))
      .map(JSON.parse)
      .noneIf(expiresWithinAnHour)

export const saveToLocalStorage = (token: GoogleToken) =>
  localStorage.setItem(KEY, JSON.stringify(token))

export const deleteFromLocalStorage = () => localStorage.removeItem(KEY)