import { Action } from 'redux'
import { Sermon } from '../../models/sermon'

export const LOAD: string = "LOAD"
export const REFRESH: string = "REFRESH"
export const PARSE: string = "PARSE"

export interface LoadAction extends Action<typeof LOAD> {
  type: typeof LOAD
}

export function load(): LoadAction {
  return { type: LOAD }
}

export interface RefreshAction extends Action<typeof REFRESH> {}
export const refresh = () => ({ type: REFRESH } as RefreshAction) 

export interface ParseAction extends Action<typeof PARSE> {
  type: typeof PARSE
  sermons: Sermon[]
}

export function parse(sermons: Sermon[]): ParseAction {
  return {
    type: PARSE,
    sermons
  }
}

export type SermonActions = LoadAction | ParseAction