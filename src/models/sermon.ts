import moment from 'moment'

export interface Service {
  identifier: string
  start: string
  youtube: string
}

export interface Sermon {
  date: string
  series: string
  title: string
  description: string
  speaker: string
  tags: string
  services: Service[]
}

export function getImageUrl(sermon: Sermon): string {
  return `https://i.ytimg.com/vi/${sermon.services[0].youtube}/hqdefault.jpg`
}

export function isToday(sermon: Sermon): boolean {
  const today = moment().startOf('day')
  return today.isSame(moment(sermon.date))
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export type PartialSermon = DeepPartial<Sermon>
