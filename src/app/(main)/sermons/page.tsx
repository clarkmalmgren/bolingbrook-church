import { SermonList } from '@/components/SermonList'
import { ComponentBySelector } from '@/components/dynamic/ComponentById'
import { PrefetchService } from '@/services/PrefetchService'
import { TypeAndNameSelector } from '@/services/utils/ContentSelector'
import { ServerComponent } from '@/types/ServerComponent'

type SermonsPageProps = {}

const SermonsPage: ServerComponent<SermonsPageProps> = 
  async () => {
    const { page }  = await PrefetchService.sermons(1)
    const prefetch = await PrefetchService.content(TypeAndNameSelector('hero', 'Sermons'))

    return (
      <>
        <ComponentBySelector type="hero" name="Sermons" prefetch={prefetch} />
        <SermonList prefetch={page}/>
      </>
    )
  }

export default SermonsPage
export const dynamic = 'auto'
