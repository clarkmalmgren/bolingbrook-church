import { PageByPath } from '@/components/dynamic/ComponentById'
import { PrefetchService } from '@/services/PrefetchService'
import { PageSelector } from '@/services/utils/ContentSelector'
import { ServerComponent } from '@/types/ServerComponent'

type DynamicPageProps = {
  params: { path?: string[] }
}

const DynamicPage: ServerComponent<DynamicPageProps> =
  async ({ params }) => {
    const prefetch = await PrefetchService.content(PageSelector(params.path))
    return <PageByPath path={params.path} prefetch={prefetch} />
  }

export default DynamicPage
