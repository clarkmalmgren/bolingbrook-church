import { FunctionComponent } from 'react'
import { getImageUrl, isToday } from '@/services/models/sermon'
import { useCurrentSermon } from '@/services/SermonService'
import { Card } from './Card'

export const SermonHeroCard: FunctionComponent<{}> =
  () => {
    const sermon = useCurrentSermon()

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
