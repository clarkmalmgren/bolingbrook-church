import { FunctionComponent } from 'react'
import { SermonList } from '../components/sermon-list'
import { ContentfulHero } from '../contentful/hero'

export const Sermons: FunctionComponent<{}> =
  () => {
    return (
      <div>
        <ContentfulHero name="sermons" />
        <SermonList />
      </div>
    )
  }

export default Sermons
