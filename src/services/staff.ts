import { query, Asset } from './contentful'

export type StaffInfo = {
  name: string
  title: string
  email: string
  order: number
  about?: any
  picture: Asset
}

export function list(): Promise<StaffInfo[]> {
  return query<StaffInfo>({content_type: 'staffCard'})
    .then(staff => {
      return staff.sort((a, b) => a.order - b.order)
    })
}
