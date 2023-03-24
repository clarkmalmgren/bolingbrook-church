import { FunctionComponent } from 'react'
import { getImageUrl, isToday } from '../models/sermon'
import { useCurrentSermon } from '../services/sermon'
import { Card } from './card'

export const SermonHeroCard: FunctionComponent<{}> =
  () => {
    const sermon = useCurrentSermon().value

    return sermon ?
      (
        <Card title={ isToday(sermon ) ? "Today's Sermon" : "Latest Sermon" }
          subtitle={ sermon.title }
          image={ getImageUrl(sermon) }
          link={ `/sermons/${sermon.date}` }/>
      ) : (
        <Card title="" image="" link="#" />
      )
  }
