import { Sermon } from '../../models/sermon'

export function fetchSermons(): Promise<Sermon[]> {
  return fetch(`${process.env.REACT_APP_FIREBASE_DATABASE_URL}/data/sermons_v2.json`)
      .then(r => r.json())
      .then(Object.values)
      .then(a => a.reverse())
      
}
