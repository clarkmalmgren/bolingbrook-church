import { Content } from '../models/Content'

export type ContentSelector = (content: Content) => boolean

export function PageSelector(path?: string[]): ContentSelector {
  let fullPath = '/' + (path || []).join('/')
  return (c) => c.meta.type === 'page' && c.data.path === fullPath
}

export function TypeAndNameSelector(type: string, name: string): ContentSelector {
  return (c) => c.meta.type === type && c.meta.name === name
}
