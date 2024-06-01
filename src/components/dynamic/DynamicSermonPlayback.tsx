'use client'

import { FunctionComponent } from 'react'
import { SermonPlayback } from '../SermonPlayback'
import { SermonMap } from '@/services/models/sermon'
import { useSermon } from '@/services/SermonService'

export type DynamicSermonPlaybackProps = {
  date: string
  prefetch?: SermonMap
}

export const DynamicSermonPlayback: FunctionComponent<DynamicSermonPlaybackProps> =
  ({ date, prefetch }) => {
    const data = useSermon(date, prefetch)
    return <SermonPlayback sermon={data} />
  }
