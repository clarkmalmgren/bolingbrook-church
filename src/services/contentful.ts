import { createClient, Asset as ContentfulAsset, ContentfulClientApi } from 'contentful'
import { useLocation } from 'react-router-dom'

export type Asset = ContentfulAsset

const publishedClient = createClient({
  space: 'eiyme5kkttnk',
  accessToken: '6a8d5626e4b0e632e15ca2694084cd5789404ad0413ef00e3503fe42b46deb0f'
})

const previewClient = createClient({
  space: 'eiyme5kkttnk',
  accessToken: 'a0798dedc7fbb317c75a604d712add8a869b98a5aa05851068e757180e09e48c',
  host: 'preview.contentful.com'
})


export function useContentfulClient(): ContentfulClientApi {
  const isPreview = useLocation().pathname.startsWith('/preview')
  return isPreview ? previewClient : publishedClient
}

export function useMediaUrl(id: string, width: number = window.screen.width): Promise<string> {
  return useContentfulClient()
    .getAsset(id)
    .then(a => a.fields.file.url + "?w=" + width)
}

export function runQuery<T>(client: ContentfulClientApi, query: any): Promise<T[]> {
  return client
    .getEntries<T>(query)
    .then(e => e.items.map(i => i.fields))
}

export function useQuery<T>(query: any): Promise<T[]> {
  return query(useContentfulClient(), query)
}

export class ContentFinder<T, K = string> {
  
  constructor(
    private client: ContentfulClientApi,
    private type: string,
    private field_name: string
  ) {}

  find(value: K): Promise<T[]> {
    return runQuery(this.client, { content_type: this.type, [`fields.${this.field_name}`]: value })
  }

  get(value: K): Promise<T> {
    return this.find(value).then(list => list[0])
  }
}
