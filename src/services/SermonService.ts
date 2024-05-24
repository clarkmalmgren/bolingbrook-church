import moment from 'moment'
import { Sermon, SermonMap } from './models/sermon'
import { SharedCollectionListenerService, useSharedHook } from './FirestoreSharedHooks'
import { firestore as db } from '@/services/utils/Firebase'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { FormResponse, tryResponse } from '@/forms/Form'

const SermonService = new class extends SharedCollectionListenerService<Sermon> {
  constructor() {
    super(db, `cms/${process.env.NEXT_PUBLIC_ENV}/sermons`)
  }
}

export function useSermonMap(): SermonMap | undefined {
  return useSharedHook(SermonService, (d) => d, [])
}

export function useSermon(date: string): Sermon | undefined {
  return useSharedHook(SermonService, (d) => d[date], [ date ])
}


export function useSermons(): Sermon[] | undefined {
  const map = useSermonMap()
  if (typeof map === 'undefined') {
    return undefined
  }

  return Object.values(map).sort((a, b) => {
    if (a.date === b.date) {
      return 0
    } else if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function useCurrentSermon(): Sermon | undefined {
  const today = moment().startOf('day')
  return useSermons()?.find(s =>  moment(s.date).isSameOrBefore(today))
}

export async function saveSermon(data: Sermon): Promise<FormResponse<Sermon>> {
  const ref = doc(db, `cms/${process.env.NEXT_PUBLIC_ENV}/sermons/${data.date}`)

  return tryResponse(async () => {
    setDoc(ref, data)
    return data
  })
}
