import { PageByPath } from '@/components/dynamic/ComponentById'
import { PrefetchService } from '@/services/PrefetchService'
import { ServerComponent } from '@/types/ServerComponent'

type DynamicPageProps = {
  params: { path?: string[] }
}

const DynamicPage: ServerComponent<DynamicPageProps> =
  async ({ params }) => {
    const media = await PrefetchService.media()
    const content = await PrefetchService.content()
    const path = params.path || []

    return <PageByPath path={path} prefetch={{ media, content }} />
  }

export default DynamicPage
