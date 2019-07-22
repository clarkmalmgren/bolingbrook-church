import { Sermon } from '../models/sermon'
import { readFromLocalStorage } from '../store/auth/effects'

export function save(data: Sermon): Promise<any> {
  const token = readFromLocalStorage().get().accessToken
  
  const init = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }

  return fetch(`${process.env.REACT_APP_API_URL}/sermons`, init)
}