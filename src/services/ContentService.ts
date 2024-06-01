'use client'

import { FormResponse, tryResponse } from '@/forms/Form'
import { SharedCollectionListenerService, useSharedHook } from '@/services/FirestoreSharedHooks'
import { firestore as db } from '@/services/utils/Firebase'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { createContext, useContext } from 'react'
import { useAuthState } from './FirebaseAuthService'
import { Content, ContentMap, clean } from './models/Content'
import { bustCache } from '@/actions/bustCache'

export const ContentService = new class extends SharedCollectionListenerService<Content> {
  constructor() {
    super(db, `cms/${process.env.NEXT_PUBLIC_ENV}/content`)
  }
}

export const ContentOverrides = createContext<ContentMap>({})

/* Keep this reference around for more deeply nested content lookups */
let _prefetched: ContentMap | undefined = undefined

export function useContentMap(prefetch?: ContentMap): ContentMap | undefined {
  _prefetched = prefetch || _prefetched
  const overrides = useContext(ContentOverrides)
  const base = useSharedHook(ContentService, (data) => data, [], _prefetched)
  return (typeof base === 'undefined') ? undefined : { ...base, ...overrides }
}

export function useContent(id?: string, prefetch?: ContentMap): Content | undefined {
  const map = useContentMap(prefetch)
  return id ? map?.[id] : undefined
}

export function useContents<T extends Content>(ids?: string[], prefetch?: ContentMap): T[] | undefined {
  const map = useContentMap(prefetch)
  return map ? ids?.map(i => map[i] as T) : undefined
}

export function useAllContent(prefetch?: ContentMap): Content[] | undefined {
  const map = useContentMap(prefetch)
  return map ? Object.values(map).sort((a, b) => a.meta.name?.localeCompare(b.meta.name)) : undefined
}

export function useFilteredContent(types?: string | string[], prefetch?: ContentMap): Content[] | undefined {
  const all = useAllContent(prefetch)
  
  if (!all || !types) {
    return all
  }

  if (typeof types === 'string') {
    return all.filter((c) => c.meta.type === types)
  } else {
    return all.filter((c) => types.includes(c.meta.type))
  }
}

export function useContentSearch(search: string, prefetch?: ContentMap): Content[] | undefined {
  const all = useAllContent(prefetch)
  if (!all || !search) { return all }
  
  const terms = search.toLowerCase().split(/ +/)
  return all.filter(c => {
    const s = [c.meta.name,  c.meta.type, c.meta.author, c.meta.updated_by].join(' ').toLowerCase()
    return terms.findIndex(t => !s.includes(t)) < 0
  })
}

export function useSaveContent(): (id: string, data: Content) => Promise<FormResponse<Content>> {
  const auth = useAuthState()

  return async (id: string, data: Content) => {
    // Populate author and created if they don't already exist...
    if (!data.meta.author) { data.meta.author = auth?.name || auth?.email }
    if (!data.meta.created) { data.meta.created = new Date().getTime() }

    // Always update the updated time and updated by...
    data.meta.updated = new Date().getTime()
    data.meta.updated_by = auth?.name || auth?.email

    const ref = doc(db, `cms/${process.env.NEXT_PUBLIC_ENV}/content/${id}`)

    return tryResponse(async () => {
      await setDoc(ref, clean(data))
      await bustCache()
      return data
    })
  }
}

export async function deleteContent(id: string): Promise<FormResponse<{ meta: { id: string } }>> {
  const ref = doc(db, `cms/${process.env.NEXT_PUBLIC_ENV}/content/${id}`)

  return tryResponse(async () => {
    await deleteDoc(ref)
    await bustCache()
    return { meta: { id } }
  })
}
