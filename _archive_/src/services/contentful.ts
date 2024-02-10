import { ContentfulLivePreview } from '@contentful/live-preview'
import { isEqualReactSimple } from '@react-hookz/deep-equal'
import { ContentfulClientApi, Entry, EntryCollection, createClient } from 'contentful'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

// TODO: Figure out how to add in errors for downloads

const liveClient = createClient({
  space: 'eiyme5kkttnk',
  accessToken: '6a8d5626e4b0e632e15ca2694084cd5789404ad0413ef00e3503fe42b46deb0f'
})

const previewClient = createClient({
  space: 'eiyme5kkttnk',
  accessToken: 'a0798dedc7fbb317c75a604d712add8a869b98a5aa05851068e757180e09e48c',
  host: 'preview.contentful.com'
})

export function useIsPreview(): boolean {
  return useLocation().pathname.startsWith('/preview')
}

// Used to track whether or not we have initialized the live preview (should be done exactly once)
let livePreviewInitialized: boolean = false

function useContentfulClient(): ContentfulClientApi {
  if (useIsPreview()) {
    if (!livePreviewInitialized) {
      livePreviewInitialized = true
      ContentfulLivePreview.init({ locale: 'en-US' })
    }
    return previewClient
  } else {
    return liveClient
  }
}

type Unsubscribe = () => void

function useWatchedState<T, S extends Entry<T> | EntryCollection<T>>(init: S | undefined): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
  const [ e, setE ] = useState(init)
  const watching = useRef(false)

  useEffect(() => {
    if (livePreviewInitialized && !watching.current && e) {
      watching.current = true
      ContentfulLivePreview.subscribe({
        data: e,
        callback: (updated) => {
          setE({ ...updated } as S)
        }
      })
    }
  }, [ e ])

  return [ e, setE ]
}

export type UseEntryResponse<T> = { initialized: boolean, data?: T, entry?: Entry<T> }

export function useEntry<T>(id: string, query?: any, init?: Entry<T>): UseEntryResponse<T> {
  const [ initialized, setInitialized ] = useState(false)
  const [ entry, setEntry ] = useWatchedState<T, Entry<T>>(init)
  const client = useContentfulClient()
  const queryRef = useRef(query)
  const unsub = useRef<Unsubscribe | undefined>(undefined)

  if (!isEqualReactSimple(queryRef.current, query)) {
    queryRef.current = query
  }

  useEffect(() => {
    client
    .getEntry<T>(id, queryRef.current)
    .then(e => {
      setInitialized(true)
      setEntry(e)
    })
    
    const lastUnsub = unsub.current
    return () => { lastUnsub?.() }
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ client, id, queryRef.current ]) // setEntry not required

  return { initialized, entry, data: entry?.fields }
}

export type UseEntriesResponse<T> = { initialized: boolean, data?: T[], entries?: Entry<T>[], collection?: EntryCollection<T> }

export function useEntries<T>(query: any, init?: EntryCollection<T>): UseEntriesResponse<T> {
  const [ initialized, setInitialized ] = useState(!!init?.total)
  const [ collection, setCollection ] = useWatchedState<T, EntryCollection<T>>(init)
  const client = useContentfulClient()
  const queryRef = useRef(query)

  if (!isEqualReactSimple(queryRef.current, query)) {
    queryRef.current = query
  }

  useEffect(() => {
    client
      .getEntries<T>(queryRef.current)
      .then(e => {
        setInitialized(true)
        setCollection(e)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ client, queryRef.current ]) // setCollection not required

  return { initialized, collection, entries: collection?.items, data: collection?.items?.map(e => e.fields) }
}

export type EntrySelector<T> = (c?: EntryCollection<T>) => Entry<T> | undefined

function DefaultEntrySelector<T>(c?: EntryCollection<T>): Entry<T> | undefined {
  return c?.items[0]
}

export function useQueryOne<T>(query: any, init?: Entry<T>, selector?: EntrySelector<T>): UseEntryResponse<T> {
  const { initialized, collection } = useEntries(query, InitEntryCollection.maybe(init))
  const actualSelector = selector || DefaultEntrySelector
  const entry = actualSelector(collection)
  return { initialized, entry, data: entry?.fields }
}

export class InitEntryCollection<T> implements EntryCollection<T> {

  static maybe<T>(init?: Entry<T>): EntryCollection<T> | undefined {
    return init ? new InitEntryCollection([init]) : undefined
  }

  constructor(public readonly items: Entry<T>[]) {}

  readonly errors = undefined
  readonly includes = undefined
  readonly total: number = this.items.length
  readonly skip: number = 0
  readonly limit: number = this.items.length

  stringifySafe(replacer?: any, space?: any): string {
    throw new Error('Method not implemented.')
  }
  toPlainObject(): object {
    throw new Error('Method not implemented.')
  }
}
