import { Content, useContent } from '@/services/ContentService'
import { FunctionComponent } from 'react'
import { ButtonContent, ButtonContentProps } from './Button'
import { CardContent, CardContentProps } from './Card'
import { CardListContent, CardListContentProps } from './CardList'
import { RichTextContent, RichTextContentProps } from './RichText'
import { HeroContent, HeroContentProps } from './Hero'
import { FlexProps, Flex } from './Flex'
import { useMedia } from '@/services/MediaService'

type DynamicProvider<T extends {}> = (content: Content<T>) => JSX.Element

const Providers: { [type: string]: DynamicProvider<any> } = {
  button:   (c: Content<ButtonContentProps>)    => <ButtonContent   {...c.data} />,
  card:     (c: Content<CardContentProps>)      => <CardContent     {...c.data} />,
  cardlist: (c: Content<CardListContentProps>)  => <CardListContent {...c.data} />,
  flex:     (c: Content<FlexProps>)             => <Flex            {...c.data} />,
  hero:     (c: Content<HeroContentProps>)      => <HeroContent     {...c.data} />,
  richtext: (c: Content<RichTextContentProps>)  => <RichTextContent {...c.data} />,
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

export const MediaById: FunctionComponent<{ id: string }> =
  ({ id }) => {
    const ref = useMedia(id)

    if (!ref) {
      return null
    } else if (ref.video) {
      return (
        <video autoPlay muted loop
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'middle center'}}>
          <source src={ref.url} />
        </video>
      )
    } else {
      return <img src={ref.url} />
    }
  }
