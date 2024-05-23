
export type ContentMeta = {
  id: string
  type: string
  name: string
  author?: string
  created?: number
  updated_by?: string
  updated?: number
}

export type ContentOf<T> = {
  [K in keyof T as T[K] extends (Function | undefined) ? never : K]: T[K]
}

export type ContentWithChildrenOf<T> = ContentOf<T> & { children?: string[]} 

export type Content<T extends {} = { [k: string]: any} > = {
  meta: ContentMeta
  data: T
}

export type ContentMap = { [key: string]: Content }

function _clean(data: any): any {
  const cleaned: any = {}
  Object.keys(data).forEach(k => {
    const v: any = data[k]
    if (typeof v === 'undefined' || k === null) {
      // do nothing
    } else if (Array.isArray(v)) {
      cleaned[k] = v.filter(e => typeof e !== 'undefined' && e !== null)
    } else if (typeof v === 'object') {
      cleaned[k] = _clean(v)
    } else {
      cleaned[k] = v
    }
  })
  return cleaned
}

export function clean<T extends {} = { [k: string]: any} >(content: Content<T>): Content<T> {
  return {
    meta: _clean(content.meta),
    data: _clean(content.data)
  }
}
