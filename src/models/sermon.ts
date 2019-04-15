
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
