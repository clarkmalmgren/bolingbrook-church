import { Content } from '@/services/ContentService'
import { FunctionComponent } from 'react'
import { ButtonContent, ButtonContentProps } from './Button'
import { CardContent, CardContentProps } from './Card'
import { CardListContent, CardListContentProps } from './CardList'
import { RichTextContent, RichTextContentProps } from './RichText'

type DynamicProvider<T extends {}> = (content: Content<T>) => JSX.Element

const Providers: { [type: string]: DynamicProvider<any> } = {
  button:   (c: Content<ButtonContentProps>)    => <ButtonContent {...c.data} />,
  card:     (c: Content<CardContentProps>)      => <CardContent {...c.data} />,
  cardlist: (c: Content<CardListContentProps>)  => <CardListContent {...c.data} />,
  richtext: (c: Content<RichTextContentProps>)  => <RichTextContent {...c.data} />
}

type DynamicComponentProps = {
  content: Content
}

export const DynamicComponent: FunctionComponent<DynamicComponentProps> =
  ({ content }) => Providers[content.meta.type](content)
