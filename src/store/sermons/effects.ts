import { Sermon } from '../../models/sermon'

export function fetchSermons(): Promise<Sermon[]> {
  return fetch("https://bolingbrook-church.firebaseio.com/data/sermons_v2.json")
      .then(r => r.json())
      .then(Object.values)
      .then(a => a.reverse())
      
}
