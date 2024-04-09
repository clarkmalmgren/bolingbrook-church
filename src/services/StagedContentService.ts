import { FormResponse, tryResponse } from '@/forms/Form'
import { SharedCollectionListenerService, useSharedHook } from '@/services/FirestoreSharedHooks'
import { firestore as db } from '@/services/utils/Firebase'
import { deleteDoc, doc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSaveContent } from './ContentService'
import { Content, ContentMap } from './models/Content'
import { Random } from './utils/Random'

const StagedContentService = new class extends SharedCollectionListenerService<Content> {
  constructor() {
    super(db, `cms/${process.env.NODE_ENV}/staged`)
  }
}

const cache: ContentMap = {}
const timers: { [key: string]: any } = {}
const listeners: { [id: number]: () => void } = {}
let nextListenerId = 0
const DebounceInMillis = 1000

export function useStagedContentMap(): ContentMap | undefined {
  const [ x, setX ] = useState(0)

  useEffect(() => {
    const id = nextListenerId++
    listeners[id] = () => { setX(Math.random()) }
    return () => { delete listeners[id] }
  }, [])

  const remote = useSharedHook(StagedContentService, (data) => data, [])
  return (typeof remote === 'undefined') ? undefined : { ...remote, ...cache }
}

export function useStagedCount(): number | undefined {
  const map = useStagedContentMap()
  return map ? Object.keys(map).length : undefined
}

export function stageContent(id: string, data: Content): void {
  cache[id] = data
  Object.values(listeners).forEach(l => l())

  if (id in timers) {
    clearTimeout(timers[id])
  }

  timers[id] = setTimeout(() => {
    const ref = doc(db, `cms/${process.env.NODE_ENV}/staged/${id}`)
    setDoc(ref, cache[id])
    delete timers[id]
    delete cache[id]
  }, DebounceInMillis)
}

export function createNewContent(type: string): string {
  const id = Random.string(10)
  stageContent(id, {
    meta: { id, type, updated_by: 'STAGED', name: '' },
    data: {}
  })
  return id
}

export async function deleteStagedContent(id: string): Promise<FormResponse<{ meta: { id: string } }>> {
  const ref = doc(db, `cms/${process.env.NODE_ENV}/staged/${id}`)

  return tryResponse(async () => {
    delete cache[id]
    await deleteDoc(ref)
    Object.values(listeners).forEach(l => l())
    return { meta: { id } }
  })
}

type UseCommit = {
  loading: boolean
  commit: () => Promise<FormResponse>
}

export function useCommitAllStagedContent(): UseCommit {
  const [ loading, setLoading ] = useState(false)
  const staged = useStagedContentMap()
  const save = useSaveContent()

  return {
    loading,
    commit: () => tryResponse(async () => {
      if (!staged) { throw new Error('No staged content to commit') }
      setLoading(true)

      for (let c of Object.values(staged)) {
        await save(c.meta.id, c)
      }

      for (let k in staged) {
        await deleteStagedContent(k)
      }
      
      setLoading(false)
    })
  }
}
