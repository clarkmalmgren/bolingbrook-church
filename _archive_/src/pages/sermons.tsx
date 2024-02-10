import { FunctionComponent } from 'react'
import { SermonList } from '../components/sermon-list'
import { ContentfulHero } from '../contentful/hero'

export const Sermons: FunctionComponent<{}> =
  () => (
    <div>
      <ContentfulHero name="sermons" />
      <SermonList />
    </div>
  )
