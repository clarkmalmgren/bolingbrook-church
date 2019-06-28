import * as contentful from 'contentful'

const client = contentful.createClient({
  space: 'eiyme5kkttnk',
  accessToken: '6a8d5626e4b0e632e15ca2694084cd5789404ad0413ef00e3503fe42b46deb0f'
})

export function getMediaUrl(id: string, width: number = screen.width): Promise<string> {
  return client
    .getAsset(id)
    .then(a => a.fields.file.url + "?w=" + width)
}

export function getEntry<T>(id: string): Promise<T> {
  return client
    .getEntry<T>(id)
    .then(e => e.fields)
}

export function findEntry<T>(query: any): Promise<T[]> {
  return client
    .getEntries<T>(query)
    .then(e => e.items.map(i => i.fields))
}

export function findStaticPage<T>(name: string): Promise<T[]> {
  return client
    .getEntries<T>({
      content_type: 'staticPage',
      'fields.pageName': name
    })
    .then(e => e.items.map(i => i.fields))
}
