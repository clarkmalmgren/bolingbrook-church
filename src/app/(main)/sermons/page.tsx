import { SermonList } from '@/components/SermonList'
import { ComponentBySelector } from '@/components/dynamic/ComponentById'
import { PrefetchService } from '@/services/PrefetchService'
import { ServerComponent } from '@/types/ServerComponent'

type SermonsPageProps = {}

const SermonsPage: ServerComponent<SermonsPageProps> = 
  async () => {
    const sermons = await PrefetchService.sermons()
    const media = await PrefetchService.media()
    const content = await PrefetchService.content()

    return (
      <>
        <ComponentBySelector type="hero" name="Sermons" prefetch={{ media, content }} />
        <SermonList prefetch={sermons}/>
      </>
    )
  }

export default SermonsPage
export const dynamic = 'auto'
