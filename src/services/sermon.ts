import moment from 'moment'
import { Sermon } from '../models/sermon'
import { useAuthToken } from './auth'
import { Data, useData } from './data'

export function useSermon(date: string): Data<Sermon> {
  return useData(`data/sermons_v2/${date}`)
}

export function useSermonMap(): Data<{ [date: string]: Sermon }> {
  return useData('data/sermons_v2')
}

export function useSermons(): Data<Sermon[]> {
  return useSermonMap().map(m => Object.values(m).sort((a, b) => {
    if (a.date === b.date) {
      return 0
    } else if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  }))
}

export function useCurrentSermon(): Data<Sermon | undefined> {
  const today = moment().startOf('day')
  return useSermons().map(l => l.find(s =>  moment(s.date).isSameOrBefore(today)))
}

export function useSaveSermon(): (data: Sermon) => Promise<any> {
  const token = useAuthToken()

  return async (data: Sermon) => {
    const init = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token?.tokenId}`
      }
    }

    return fetch(`${process.env.REACT_APP_API_URL}/sermons`, init)
  }
}
