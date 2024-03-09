import { EmptySuccessResponse, FormResponse } from '@/forms/Form'
import { SharedCollectionListenerService, useSharedHook } from '@/services/FirestoreSharedHooks'
import { firestore as db } from '@/services/utils/Firebase'
import { doc, setDoc } from 'firebase/firestore'

export type ContentMeta<S extends string> = {
  id: string
  type: S
  name: string
  children?: string[]
}

export type ContentOf<T, S extends string> = ContentMeta<S> & {
  [ K in keyof T as T[K] extends (Function | undefined) ? never : K ]: T[K]
}

const ContentService = new class extends SharedCollectionListenerService<ContentMeta<string>> {
  constructor() {
    super(db, `cdn/${process.env.NODE_ENV}/content`)
  }
}

export function useContent<T extends ContentMeta<string>>(id?: string): T | undefined {
  return useSharedHook(
    ContentService,
    (data) => id ? data[id] as T | undefined : undefined,
    [id]
  )
}

export function useContents<T extends ContentMeta<string>>(ids?: string[]): T[] | undefined {
  return useSharedHook(
    ContentService,
    (data) => ids ? ids.map(id => data[id] as T) : undefined,
    ids
  )
}

export function useAllContent(): ContentMeta<string>[] | undefined {
  return useSharedHook(
    ContentService,
    (data) => Object.values(data).sort((a, b) => a.name?.localeCompare(b.name)),
    []
  )
}

export async function saveContent(id: string, data: ContentMeta<any>): Promise<FormResponse> {
  const ref = doc(db, `cdn/${process.env.NODE_ENV}/content/${id}`)
  await setDoc(ref, data)
  return {
    ok: true,
    bodyString: async () => { return '' },
    json: async () => { return data }
  }
}