import { useAllContent, useContent } from '@/services/ContentService'
import { Content } from '@/services/models/Content'
import { CSSProperties, FunctionComponent, PropsWithChildren } from 'react'
import { ButtonContent, ButtonContentProps } from './Button'
import { CardContent, CardContentProps } from './Card'
import { CardListContent, CardListContentProps } from './CardList'
import { RichTextContent, RichTextContentProps } from './RichText'
import { HeroContent, HeroContentProps } from './Hero'
import { FlexProps, Flex } from './Flex'
import { useMedia } from '@/services/MediaService'
import { Grid, GridProps } from './Grid'
import { Page, PageProps } from './Page'
import { Section } from './Section'
import { Box, SxProps, Theme } from '@mui/material'
import { GraphicSection, GraphicSectionProps } from './GraphicSection'

type DynamicProvider<T extends {}> = (content: Content<T>) => JSX.Element

const AutopadExclusions: { [type: string]: boolean } = {
  hero: true,
  page: true,
  graphicSection: true
}

const Providers: { [type: string]: DynamicProvider<any> } = {
  button:   (c: Content<ButtonContentProps>)    => <ButtonContent   {...c.data} />,
  card:     (c: Content<CardContentProps>)      => <CardContent     {...c.data} />,
  cardlist: (c: Content<CardListContentProps>)  => <CardListContent {...c.data} />,
  flex:     (c: Content<FlexProps>)             => <Flex            {...c.data} />,
  graphicSection: (c: Content<GraphicSectionProps>) => <GraphicSection {...c.data} />,
  grid:     (c: Content<GridProps>)             => <Grid            {...c.data} />,
  hero:     (c: Content<HeroContentProps>)      => <HeroContent     {...c.data} />,
  page:     (c: Content<PageProps>)             => <Page            {...c.data} />,
  richtext: (c: Content<RichTextContentProps>)  => <RichTextContent {...c.data} />,
}

type DynamicComponentProps = {
  content: Content
}

export const DynamicComponent: FunctionComponent<DynamicComponentProps> =
  ({ content }) => Providers[content.meta.type](content)

type ComponentByIdProps = {
  id: string,
  autopad?: boolean
}

export const ComponentById: FunctionComponent<ComponentByIdProps> =
  ({ id, autopad }) => {
    const content = useContent(id)
    if (!content) {
      return null
    }
    const child = Providers[content.meta.type]?.(content)

    if (!child) {
      return null
    } else if (autopad && !AutopadExclusions[content.meta.type]) {
      return <Section>{child}</Section>
    } else {
      return child
    }
  }

type MediaByIdProps = {
  id: string,
  style?: CSSProperties
}

export const MediaById: FunctionComponent<MediaByIdProps> =
  ({ id, style }) => {
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
            objectPosition: 'middle center',
            ...style
          }}>
          <source src={ref.url} />
        </video>
      )
    } else {
      return <img style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', ...style }} src={ref.url} />
    }
  }

export type BackgroundMediaByIdProps = {
  id: string,
  sx?: SxProps<Theme>
}

export const BackgroundMediaById: FunctionComponent<PropsWithChildren<BackgroundMediaByIdProps>> =
  ({ id, sx, children }) => {
    const ref = useMedia(id)

    return (
      <Box sx={sx} style={{ backgroundImage: ref ? `url(${ref.url})` : undefined }}>
        { children }
      </Box>
    )
  }

type ComponentBySelectorProps = {
  selector: (c: Content) => boolean
}

export const ComponentBySelector: FunctionComponent<ComponentBySelectorProps> =
  ({ selector }) => {
    const all = useAllContent()
    const content = all?.find(selector)
    return content ? Providers[content.meta.type](content) : null
  }
