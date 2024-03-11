import { FormResponse } from '@/forms/Form'
import { SharedCollectionListenerService, useSharedHook } from '@/services/FirestoreSharedHooks'
import { firestore as db, storage } from '@/services/utils/Firebase'
import { deleteDoc, doc, setDoc, getDoc } from 'firebase/firestore'
import { ref as storageRef, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'

export type MediaRef = {
  id: string
  name: string
  url: string
  fullPath: string
}

const MediaService = new class extends SharedCollectionListenerService<MediaRef> {
  constructor() {
    super(db, `cdn/${process.env.NODE_ENV}/media`)
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

export async function uploadMedia(id: string, name: string, file: File): Promise<FormResponse> {
  const dataRef = doc(db, `cdn/${process.env.NODE_ENV}/media/${id}`)
  const mediaRef = storageRef(storage, `cdn/${process.env.NODE_ENV}/media/${id}`)
  
  const snap = await uploadBytes(mediaRef, file)

  const data: MediaRef = {
    id,
    name,
    url: await getDownloadURL(mediaRef),
    fullPath: mediaRef.fullPath
  }

  await setDoc(dataRef, data)
  return {
    ok: true,
    bodyString: async () => { return '' },
    json: async () => { return data }
  }
}

export async function deleteMedia(id: string): Promise<FormResponse> {
  const dataRef = doc(db, `cdn/${process.env.NODE_ENV}/media/${id}`)
  const snap = await getDoc(dataRef)
  const data = snap.data() as MediaRef

  if (!data) { throw new Error(`Can't delete missing node`) }

  const mediaRef = storageRef(storage, data.fullPath)
  await deleteObject(mediaRef)
  await deleteDoc(dataRef)

  return {
    ok: true,
    bodyString: async () => { return '' },
    json: async () => { return data }
  }
}
