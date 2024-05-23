'use client'

import { Section } from '@/components/Section'
import { SermonList } from '@/components/SermonList'
import { SermonPlayback } from '@/components/SermonPlayback'
import { Typography } from '@mui/material'
import { FunctionComponent } from 'react'

type SermonPageProp = {
  params: {
    date: string
  }
}

const SermonPage: FunctionComponent<SermonPageProp> =
  ({ params: { date } }) => (
    <Section wide>
      <SermonPlayback date={date} />
      <Typography variant="h1" align="center">More Sermons</Typography>
      <SermonList />
    </Section>
  )

export default SermonPage
