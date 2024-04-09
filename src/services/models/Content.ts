
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