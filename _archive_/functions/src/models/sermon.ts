
export type Sermon = {
  date: string,
  title: string,
  description: string,
  speaker?: string,
  services: Service[]
}

export type Service = {
  identifier: string,
  start: string,
  youtube: string
}

export function parseSermons(data: any): Sermon[] {
  return Object.values(data).map(parseSermon)
}

export function parseSermon(data: any): Sermon {
  return {
    date: data.date,
    title: data.title,
    description: data.description,
    speaker: data.speaker,
    services: parseServices(data.services)
  }
}

export function parseServices(data: any): Service[] {
  return Object.values(data).map(parseService)
}

export function parseService(data: any): Service {
  return {
    identifier: data.identifier,
    start: data.start,
    youtube: data.youtube
  }
}

export function isValidSermon(sermon: Sermon): boolean {
  return !!sermon.date &&
    !!sermon.date.match(/^\d{4}-(0[1-9]|10|11|12)-(0[1-9]|[12][0-9]|30|31)$/) &&
    !!sermon.title &&
    !!sermon.description &&
    areServicesValid(sermon.services)
}

function areServicesValid(services: Service[]): boolean {
  // it is valid if there are no invalid services
  return !services.find(isInvalidService)
}

export function isInvalidService(service: Service): boolean {
  return !service.identifier ||
    !service.youtube ||
    !service.start ||
    !service.start.match(/^(0[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?$/)
}
