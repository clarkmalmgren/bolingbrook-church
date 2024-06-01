import { firestore as db } from '@/services/utils/Firebase'
import { collection, getDocs } from 'firebase/firestore'
import { ContentMap } from './models/Content'
import { MediaRefMap } from './models/MediaRef'
import { SermonMap } from './models/sermon'


export const PrefetchService = new class {

  private async load<T>(path: string): Promise<{ [key: string]: T }> {
    const snap = await getDocs(collection(db, path))
    const data: { [ key: string ]: T } = {}
    snap.forEach((d) => { data[d.id] = d.data() as T })
    return data
  }

  content(): Promise<ContentMap> {
    return this.load(`cms/${process.env.NEXT_PUBLIC_ENV}/content`)
  }

  sermons(): Promise<SermonMap> {
    return this.load(`cms/${process.env.NEXT_PUBLIC_ENV}/sermons`)
  }

  media(): Promise<MediaRefMap> {
    return this.load(`cms/${process.env.NEXT_PUBLIC_ENV}/media`)
  }

}
