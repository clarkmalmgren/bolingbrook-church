import { Content } from '@/services/models/Content'
import { FunctionComponent } from 'react'
import { ButtonContent, ButtonContentProps } from '../Button'
import { CardContent, CardContentProps } from '../CardContent'
import { CardListContent, CardListContentProps } from '../CardList'
import { Flex, FlexProps } from '../Flex'
import { GraphicSection, GraphicSectionProps } from '../GraphicSection'
import { Grid, GridProps } from '../Grid'
import { HeroContent, HeroContentProps } from '../Hero'
import { IFrame, IframeProps } from '../Iframe'
import { Page, PageProps } from '../Page'
import { RichTextContent, RichTextContentProps } from '../RichText'
import { UserForm, UserFormProps } from '../UserForm'
import { SectionContent, SectionContentProps } from '../SectionContent'

type DynamicProvider<T extends {}> = (content: Content<T>) => JSX.Element

export const AutopadExclusions: { [type: string]: boolean } = {
  hero: true,
  page: true,
  graphicSection: true
}

// The Provider list looks ugly without this ¯\_(ツ)_/¯
const gs = "graphicSection"

export const Providers: { [type: string]: DynamicProvider<any> } = {
  button:   (c: Content<ButtonContentProps>)    => <ButtonContent   {...c.data} />,
  card:     (c: Content<CardContentProps>)      => <CardContent     {...c.data} />,
  cardlist: (c: Content<CardListContentProps>)  => <CardListContent {...c.data} />,
  flex:     (c: Content<FlexProps>)             => <Flex            {...c.data} />,
  form:     (c: Content<UserFormProps>)         => <UserForm        {...c.data} />,
  [gs]:     (c: Content<GraphicSectionProps>)   => <GraphicSection  {...c.data} />,
  grid:     (c: Content<GridProps>)             => <Grid            {...c.data} />,
  hero:     (c: Content<HeroContentProps>)      => <HeroContent     {...c.data} />,
  iframe:   (c: Content<IframeProps>)           => <IFrame          {...c.data} />,
  page:     (c: Content<PageProps>)             => <Page            {...c.data} />,
  richtext: (c: Content<RichTextContentProps>)  => <RichTextContent {...c.data} />,
  section:  (c: Content<SectionContentProps>)   => <SectionContent  {...c.data} />
}

type DynamicComponentProps = {
  content: Content
}

export const DynamicComponent: FunctionComponent<DynamicComponentProps> =
  ({ content }) => Providers[content.meta.type](content)

