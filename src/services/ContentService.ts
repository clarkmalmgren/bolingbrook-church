import { FormResponse } from '@/forms/Form'
import { SharedCollectionListenerService, useSharedHook } from '@/services/FirestoreSharedHooks'
import { firestore as db } from '@/services/utils/Firebase'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'

export type ContentMeta = {
  id: string
  type: string
  name: string
}

export type ContentOf<T> = {
  [ K in keyof T as T[K] extends (Function | undefined) ? never : K ]: T[K]
}

export type ContentWithChildrenOf<T> = ContentOf<T> & { children?: string[] }

export type Content<T extends {} = { [k: string]: any }> = {
  meta: ContentMeta
  data: T
}

const ContentService = new class extends SharedCollectionListenerService<Content> {
  constructor() {
    super(db, `cdn/${process.env.NODE_ENV}/content`)
  }
}

export function useContent<T extends Content>(id?: string): Content | undefined {
  return useSharedHook(
    ContentService,
    (data) => id ? data[id] as T | undefined : undefined,
    [ id ]
  )
}

export function useContents<T extends Content>(ids?: string[]): T[] | undefined {
  return useSharedHook(
    ContentService,
    (data) => ids ? ids.map(id => data[id] as T) : undefined,
    [ ids ]
  )
}

export function useAllContent(): Content[] | undefined {
  return useSharedHook(
    ContentService,
    (data) => Object.values(data).sort((a, b) => a.meta.name?.localeCompare(b.meta.name)),
    []
  )
}

export function useFilteredContent(types?: string | string[]): Content[] | undefined {
  const all = useAllContent()
  
  if (!all || !types) {
    return all
  }

  if (typeof types === 'string') {
    return all.filter((c) => c.meta.type === types)
  } else {
    return all.filter((c) => types.includes(c.meta.type))
  }
}

export async function saveContent(id: string, data: Content): Promise<FormResponse> {
  const ref = doc(db, `cdn/${process.env.NODE_ENV}/content/${id}`)
  await setDoc(ref, data)
  return {
    ok: true,
    bodyString: async () => { return '' },
    json: async () => { return data }
  }
}

export async function deleteContent(id: string): Promise<FormResponse> {
  const ref = doc(db, `cdn/${process.env.NODE_ENV}/content/${id}`)
  await deleteDoc(ref)
  return {
    ok: true,
    bodyString: async () => { return '' },
    json: async () => { return { meta: { id } } }
  }
}
