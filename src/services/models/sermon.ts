import moment from 'moment'

export type Service = {
  identifier: string
  start: string
  youtube: string
}

export type Sermon = {
  date: string
  series: string
  title: string
  description: string
  speaker: string
  tags: string
  services: Service[]
}

export function getImageUrl(sermon: Sermon): string {
  if (sermon?.services?.[0]) {
    return `https://i.ytimg.com/vi/${sermon.services[0].youtube}/hqdefault.jpg`
  } else {
    return ''
  }
}

export function isToday(sermon: Sermon): boolean {
  const today = moment().startOf('day')
  return today.isSame(moment(sermon.date))
}

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}

export function sermonSort(a: Sermon, b: Sermon): number {
  if (a.date === b.date) {
    return 0
  } else if (a.date < b.date) {
    return 1
  } else {
    return -1
  }
}

export type PartialSermon = DeepPartial<Sermon>

export type SermonMap = { [ date: string ]: Sermon }
