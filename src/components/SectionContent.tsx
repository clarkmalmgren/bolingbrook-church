import { OutputData } from '@editorjs/editorjs'
import { Typography } from '@mui/material'
import { FunctionComponent } from 'react'
import { RichText } from './RichText'
import { Section, SectionProps } from './Section'
import { ComponentById } from './dynamic/ComponentById'
import { MediaById } from './dynamic/MediaById'

export type SectionContentProps =
  Pick<SectionProps, 'wide' | 'bgcolor' | 'align' | 'dense'> & {
    body?: OutputData
    children?: string[]
    header?: SectionHeaderProps
  }

export const SectionContent: FunctionComponent<SectionContentProps> =
  ({ body, children, header, align, ...rest }) => {
    return (
      <Section align={align} {...rest}>
        {header && <SectionHeader text={header.text} image={header.image} right={align === 'right'}/> }
        {body && <div><RichText data={body} /></div>}
        {children?.map((c, i) => <ComponentById key={i} id={c} />)}
      </Section>
    )
  }

export type SectionHeaderProps = {
  text?: string
  image?: string
  right?: boolean
}

export const SectionHeader: FunctionComponent<SectionHeaderProps> =
  ({ text, image, right }) => {
    if (!text && !image) { return null }

    const media = image ? <MediaById id={image} style={{ maxHeight: 48, maxWidth: 48, margin: '0 10px' }}/> : null

    return (
      <div>
        { right && media }
        <Typography variant="h1" display="inline">{text}</Typography>
        { !right && media }
      </div>
    )
  }
