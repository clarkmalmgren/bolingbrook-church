import { FormResponse, tryResponse } from '@/forms/Form'
import { firestore as db } from '@/services/utils/Firebase'
import { doc, setDoc } from 'firebase/firestore'
import { SharedCollectionListenerService, useSharedHook } from './FirestoreSharedHooks'
import { Sermon, SermonMap, sermonSort } from './models/sermon'
import { bustCache } from '@/actions/bustCache'

export const SermonService = new class extends SharedCollectionListenerService<Sermon> {
  constructor() {
    super(db, `cms/${process.env.NEXT_PUBLIC_ENV}/sermons`)
  }
}

export function useSermonMap(prefetch?: SermonMap): SermonMap | undefined {
  return useSharedHook(SermonService, (d) => d, [], prefetch)
}

export function useSermon(date: string, prefetch?: SermonMap): Sermon | undefined {
  const map = useSermonMap(prefetch)
  return map?.[date]
}

export function useSermons(prefetch?: SermonMap): Sermon[] | undefined {
  const map = useSermonMap(prefetch)
  const values = (typeof map === 'undefined') ? undefined : Object.values(map)
  return values?.sort(sermonSort)
}

export async function saveSermon(data: Sermon): Promise<FormResponse<Sermon>> {
  const ref = doc(db, `cms/${process.env.NEXT_PUBLIC_ENV}/sermons/${data.date}`)

  return tryResponse(async () => {
    setDoc(ref, data)
    await bustCache(true)
    return data
  })
}
