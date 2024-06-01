import { FunctionComponent } from 'react'
import { ComponentById } from './dynamic/ComponentById'

export type PageProps = {
  path: string
  hero?: string
  children?: string[]
}

export const Page: FunctionComponent<PageProps> =
  ({ hero, children }) => (
    <>
      { hero && <ComponentById id={hero} /> }
      { children?.map((c, i) => <ComponentById key={i} id={c} autopad />) }
    </>
  )
