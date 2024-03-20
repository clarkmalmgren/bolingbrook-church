import { Content, useContent } from '@/services/ContentService'
import { FunctionComponent } from 'react'
import { ButtonContent, ButtonContentProps } from './Button'
import { CardContent, CardContentProps } from './Card'
import { CardListContent, CardListContentProps } from './CardList'
import { RichTextContent, RichTextContentProps } from './RichText'
import { HeroContent, HeroContentProps } from './Hero'

type DynamicProvider<T extends {}> = (content: Content<T>) => JSX.Element

const Providers: { [type: string]: DynamicProvider<any> } = {
  button:   (c: Content<ButtonContentProps>)    => <ButtonContent   {...c.data} />,
  card:     (c: Content<CardContentProps>)      => <CardContent     {...c.data} />,
  cardlist: (c: Content<CardListContentProps>)  => <CardListContent {...c.data} />,
  richtext: (c: Content<RichTextContentProps>)  => <RichTextContent {...c.data} />,
  hero:     (c: Content<HeroContentProps>)      => <HeroContent     {...c.data} />
}

type DynamicComponentProps = {
  content: Content
}

export const DynamicComponent: FunctionComponent<DynamicComponentProps> =
  ({ content }) => Providers[content.meta.type](content)

export const ComponentById: FunctionComponent<{ id: string }> =
  ({ id }) => {
    const content = useContent(id)
    return content ? Providers[content.meta.type](content) : null
  }
