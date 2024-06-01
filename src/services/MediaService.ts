import { FormResponse, tryResponse } from '@/forms/Form'
import { SharedCollectionListenerService, useSharedHook } from '@/services/FirestoreSharedHooks'
import { firestore as db, storage } from '@/services/utils/Firebase'
import { deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { MediaRef, MediaRefMap } from './models/MediaRef'
import { bustCache } from '@/actions/bustCache'

export type ImageSize = 50 | 350 | 750 | 1500
const ImageSizes: ImageSize[] = [ 50, 350, 750, 1500 ]


export const MediaService = new class extends SharedCollectionListenerService<MediaRef> {
  constructor() {
    super(db, `cms/${process.env.NEXT_PUBLIC_ENV}/media`)
  }
}

/* Keep this reference around for more deeply nested content lookups */
let _prefetched: MediaRefMap | undefined = undefined

export function useMediaMap(prefetch?: MediaRefMap): MediaRefMap | undefined {
  _prefetched = prefetch || _prefetched
  return useSharedHook(MediaService, (data) => data, [], _prefetched)
}

export function useMedia(id?: string, prefetch?: MediaRefMap): MediaRef | undefined {
  const map = useMediaMap(prefetch)
  return id ? map?.[id] : undefined
}

export function useMedias(ids?: string[], prefetch?: MediaRefMap): MediaRef[] | undefined {
  const map = useMediaMap(prefetch)
  return ids && map ? ids.map(id => map[id]) : undefined
}

export function useAllMedia(prefetch?: MediaRefMap): MediaRef[] | undefined {
  const map = useMediaMap(prefetch)
  return map ? Object.values(map).sort((a, b) => a.name?.localeCompare(b.name)) : undefined
}

export async function uploadMedia(id: string, name: string, description: string | undefined, file: File, video?: boolean): Promise<FormResponse> {
  const dataRef = doc(db, `cms/${process.env.NEXT_PUBLIC_ENV}/media/${id}`)
  const mediaRef = storageRef(storage, `cms/${process.env.NEXT_PUBLIC_ENV}/media/${id}`)
  
  const snap = await uploadBytes(mediaRef, file)

  const data: MediaRef = {
    id,
    name,
    url: await getDownloadURL(mediaRef),
    fullPath: mediaRef.fullPath,
    video: !!video
  }

  if (description) { data.description = description }

  return tryResponse(async () => {
    await setDoc(dataRef, data)
    await bustCache()
    return data
  })
}

export async function deleteMedia(id: string): Promise<FormResponse> {
  const dataRef = doc(db, `cms/${process.env.NEXT_PUBLIC_ENV}/media/${id}`)
  const snap = await getDoc(dataRef)
  const data = snap.data() as MediaRef

  if (!data) { throw new Error(`Can't delete missing node`) }

  if (!data.video) {
    for (let size of ImageSizes) {
      try {
        const sr = storageRef(storage, `${data.fullPath}_${size}x${size}`)
        await deleteObject(sr)
      } catch {}
    }
  }

  return tryResponse(async () => {
    const mediaRef = storageRef(storage, data.fullPath)
    await deleteObject(mediaRef)
    await deleteDoc(dataRef)
    await bustCache()
    return data
  })
}


export function useResizedImageUrl(ref: MediaRef | undefined, size: ImageSize): string | undefined {
  const [ url, setUrl ] = useState<string>()

  useEffect(() => {
    async function update(retries: number): Promise<void> {
      if (!ref || ref.video || retries <= 0) { return }
      try {
        const sr = storageRef(storage, `${ref.fullPath}_${size}x${size}`)
        const url = await getDownloadURL(sr)
        setUrl(url)
      } catch {
        setTimeout(() => update(retries - 1), 200)
      }
    }

    update(10)
  }, [ref, size])

  return url
}
