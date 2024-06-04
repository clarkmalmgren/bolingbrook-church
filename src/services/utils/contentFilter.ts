import { CardListContentProps } from '@/components/CardList'
import { ContentChild, FlexProps, MediaChild } from '@/components/Flex'
import { GraphicSectionProps } from '@/components/GraphicSection'
import { GridProps } from '@/components/Grid'
import { HeroContentProps } from '@/components/Hero'
import { PageProps } from '@/components/Page'
import { SectionContentProps } from '@/components/SectionContent'
import { ContentMap } from '../models/Content'
import { MediaRefMap } from '../models/MediaRef'

export type ContentAndMedia = {
  content: ContentMap
  media: MediaRefMap
}

export function contentFilter(all: ContentAndMedia, id?: string): ContentAndMedia {
  const included: ContentAndMedia = { content: {}, media: {} }
  if (id) {
    _contentFilter(all, id, included)
  }
  return included
}


function _contentFilter(all: ContentAndMedia, id: string, included: ContentAndMedia): void {
  const content = all.content[id]
  if (!content || id in included.content) {
    return
  } else {
    included.content[id] = content
  }

  const extractor = Extractors[content.meta.type]
  if (!extractor) {
    return
  }

  extractor.content?.(content.data)?.forEach(c => {
    if (c) { _contentFilter(all, c, included) }
  })

  extractor.media?.(content.data)?.forEach(c => {
    if (c) { included.media[c] = all.media[c] }
  })
}

type ChildExtractor<T> = {
  content?: (d: T) => (string | undefined)[] | undefined
  media?: (d: T) => (string | undefined)[] | undefined
}

function ext<T>(e: ChildExtractor<T>): ChildExtractor<T> { return e }

const FlexOrGridExtractor: ChildExtractor<FlexProps | GridProps> = {
  content: (d) => d.children?.filter(c => c.type === 'content').map(c => (c as ContentChild).ref),
  media: (d) => d.children?.filter(c => c.type === 'media').map(c => (c as MediaChild).ref)
}

const Extractors: { [type: string]: ChildExtractor<any> } = {
  cardlist: ext<CardListContentProps>({ content: (d) => d.children }),
  flex: FlexOrGridExtractor,
  grid: FlexOrGridExtractor,
  graphicSection: ext<GraphicSectionProps>({ media: (d) => [ d.image ] }),
  hero: ext<HeroContentProps>({ media: (c) => [ c.mediaRef ], content: (c) => c.children }),
  page: ext<PageProps>({ content: (c) => [ c.hero, ...(c.children || []) ] }),
  section: ext<SectionContentProps>({ content: (c) => c.children })
}
