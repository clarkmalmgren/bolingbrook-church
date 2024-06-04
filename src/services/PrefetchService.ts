import { firestore as db } from '@/services/utils/Firebase'
import { collection, getDocs } from 'firebase/firestore'
import { Content } from './models/Content'
import { Sermon, SermonMap, SermonPage, extractPage } from './models/sermon'
import { ContentAndMedia, contentFilter } from './utils/contentFilter'


export const PrefetchService = new class {

  private async load<T>(path: string): Promise<{ [key: string]: T }> {
    const snap = await getDocs(collection(db, path))
    const data: { [ key: string ]: T } = {}
    snap.forEach((d) => { data[d.id] = d.data() as T })
    return data
  }

  async content(selector: (c: Content) => boolean): Promise<ContentAndMedia> {
    const all: ContentAndMedia = {
      content: await this.load(`cms/${process.env.NEXT_PUBLIC_ENV}/content`),
      media: await this.load(`cms/${process.env.NEXT_PUBLIC_ENV}/media`)
    }

    const found = Object.values(all.content).find(selector)?.meta?.id
    return contentFilter(all, found)
  }

  async sermons(page: number, date?: string): Promise<{ page: SermonPage, date?: SermonMap }> {
    const map = await this.load<Sermon>(`cms/${process.env.NEXT_PUBLIC_ENV}/sermons`)

    return {
      page: extractPage(map, page),
      date: date ? { [date]: map[date] } : undefined
    }
  }

}
