import { ContentMeta } from '@/services/ContentService'
import { FunctionComponent } from 'react'
import { CardContent } from './Card'
import { RichTextContent } from './RichText'
import { ButtonContent } from './Button'

type DynamicProvider = (content: ContentMeta<string>) => JSX.Element

const Providers: { [type: string]: DynamicProvider } = {
  button: (c) => <ButtonContent {...c as any} />,
  card: (c) => <CardContent {...c as any} />,
  richtext: (c) => <RichTextContent {...c as any} />
}

type DynamicComponentProps = {
  content: ContentMeta<string>
}

export const DynamicComponent: FunctionComponent<DynamicComponentProps> =
  ({ content }) => Providers[content.type](content)
