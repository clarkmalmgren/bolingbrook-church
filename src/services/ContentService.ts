import { FormResponse, tryResponse } from '@/forms/Form'
import { SharedCollectionListenerService, useSharedHook } from '@/services/FirestoreSharedHooks'
import { firestore as db } from '@/services/utils/Firebase'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { useAuthState } from './FirebaseAuthService'
import { Content, ContentMap, clean } from './models/Content'
import { createContext, useContext } from 'react'
import { PageProps } from '@/components/Page'

export const ContentService = new class extends SharedCollectionListenerService<Content> {
  constructor() {
    super(db, `cms/${process.env.NODE_ENV}/content`)
  }
}

export const ContentOverrides = createContext<ContentMap>({})

export function useContentMap(): ContentMap | undefined {
  const overrides = useContext(ContentOverrides)
  const base = useSharedHook(ContentService, (data) => data, [])
  return (typeof base === 'undefined') ? undefined : { ...base, ...overrides }
}

export function useContent(id?: string): Content | undefined {
  const map = useContentMap()
  return id ? map?.[id] : undefined
}

export function useContents<T extends Content>(ids?: string[]): T[] | undefined {
  const map = useContentMap()
  return map ? ids?.map(i => map[i] as T) : undefined
}

export function useAllContent(): Content[] | undefined {
  const map = useContentMap()
  return map ? Object.values(map).sort((a, b) => a.meta.name?.localeCompare(b.meta.name)) : undefined
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

export function useContentSearch(search: string): Content[] | undefined {
  const all = useAllContent()
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

    const ref = doc(db, `cms/${process.env.NODE_ENV}/content/${id}`)

    return tryResponse(async () => {
      await setDoc(ref, clean(data))
      return data
    })
  }
}

export async function deleteContent(id: string): Promise<FormResponse<{ meta: { id: string } }>> {
  const ref = doc(db, `cms/${process.env.NODE_ENV}/content/${id}`)

  return tryResponse(async () => {
    await deleteDoc(ref)
    return { meta: { id } }
  })
}

export type UsePage = {
  page?: Content<PageProps>
  loading?: boolean
}

export function usePage(path: string | string[] | undefined): UsePage {
  const all = useAllContent()

  let fullPath = '/'
  if (Array.isArray(path)) {
    fullPath += path.join('/')
  } else if (typeof path === 'string') {
    fullPath += path
  }

  if (!all) {
    return { loading: true }
  } else {
    return {
      loading: false,
      page: all.find(c => c.meta.type === 'page' && c.data.path === fullPath) as (Content<PageProps> | undefined)
    }
  }
}
