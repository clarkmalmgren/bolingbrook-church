import { createClient, Asset } from 'contentful'
export type Asset = Asset

const client = createClient({
  space: 'eiyme5kkttnk',
  accessToken: '6a8d5626e4b0e632e15ca2694084cd5789404ad0413ef00e3503fe42b46deb0f'
})

export function getMediaUrl(id: string, width: number = screen.width): Promise<string> {
  return client
    .getAsset(id)
    .then(a => a.fields.file.url + "?w=" + width)
}

export function query<T>(query: any): Promise<T[]> {
  return client
    .getEntries<T>(query)
    .then(e => e.items.map(i => i.fields))
}

export class ContentFinder<T> {
  constructor(private type: string, private field_name: string) {}

  find(value: string): Promise<T[]> {
    return query({ content_type: this.type, [`fields.${this.field_name}`]: value })
  }

  get(value: string): Promise<T> {
    return this.find(value).then(list => list[0])
  }
}
