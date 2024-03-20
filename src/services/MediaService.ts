import { FormResponse, tryResponse } from '@/forms/Form'
import { SharedCollectionListenerService, useSharedHook } from '@/services/FirestoreSharedHooks'
import { firestore as db, storage } from '@/services/utils/Firebase'
import { deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import { useEffect, useState } from 'react'

export type MediaRef = {
  id: string
  name: string
  url: string
  fullPath: string
  video?: boolean
}

export type ImageSize = 50 | 350 | 750 | 1500
const ImageSizes: ImageSize[] = [ 50, 350, 750, 1500 ]

const MediaService = new class extends SharedCollectionListenerService<MediaRef> {
  constructor() {
    super(db, `cms/${process.env.NODE_ENV}/media`)
  }
}

export function useMedia(id?: string): MediaRef | undefined {
  return useSharedHook(
    MediaService,
    (data) => id ? data[id] : undefined,
    [id]
  )
}

export function useMedias(ids?: string[]): MediaRef[] | undefined {
  return useSharedHook(
    MediaService,
    (data) => ids ? ids.map(id => data[id]) : undefined,
    ids
  )
}

export function useAllMedia(): MediaRef[] | undefined {
  return useSharedHook(
    MediaService,
    (data) => Object.values(data).sort((a, b) => a.name?.localeCompare(b.name)),
    []
  )
}

export async function uploadMedia(id: string, name: string, file: File, video?: boolean): Promise<FormResponse> {
  const dataRef = doc(db, `cms/${process.env.NODE_ENV}/media/${id}`)
  const mediaRef = storageRef(storage, `cms/${process.env.NODE_ENV}/media/${id}`)
  
  const snap = await uploadBytes(mediaRef, file)

  const data: MediaRef = {
    id,
    name,
    url: await getDownloadURL(mediaRef),
    fullPath: mediaRef.fullPath,
    video: !!video
  }

  return tryResponse(async () => {
    await setDoc(dataRef, data)
    return data
  })
}

export async function deleteMedia(id: string): Promise<FormResponse> {
  const dataRef = doc(db, `cms/${process.env.NODE_ENV}/media/${id}`)
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
    return data
  })
}


export function useResizedImageUrl(ref: MediaRef | undefined, size: ImageSize): string | undefined {
  const [ url, setUrl ] = useState<string>()

  const update = async (retries: number) => {
    if (!ref || ref.video || retries <= 0) { return }
    try {
      const sr = storageRef(storage, `${ref.fullPath}_${size}x${size}`)
      const url = await getDownloadURL(sr)
      setUrl(url)
    } catch {
      setTimeout(() => update(retries - 1), 200)
    }
  }

  useEffect(() => {
    update(10)
  }, [ref, size])

  return url
}
