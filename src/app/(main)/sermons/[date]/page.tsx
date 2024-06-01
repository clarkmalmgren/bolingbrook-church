import { Section } from '@/components/Section'
import { SermonList } from '@/components/SermonList'
import { DynamicSermonPlayback } from '@/components/dynamic/DynamicSermonPlayback'
import { PrefetchService } from '@/services/PrefetchService'
import { ServerComponent } from '@/types/ServerComponent'
import { Typography } from '@mui/material'

type SermonPageProp = {
  params: {
    date: string
  }
}

const SermonPage: ServerComponent<SermonPageProp> =
  async ({ params }) => {
    const sermons = await PrefetchService.sermons()
    
    return (
      <Section wide>
        <DynamicSermonPlayback date={params.date} prefetch={sermons} />
        <Typography variant="h1" pt={3} pb={1} maxWidth={1550} ml="auto" mr="auto">More Sermons</Typography>
        <SermonList prefetch={sermons} />
      </Section>
    )
  }

export default SermonPage
