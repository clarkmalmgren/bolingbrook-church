import { Box, ButtonBase } from '@mui/material'
import { Asset, Entry } from 'contentful'
import { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../components/loading'
import { useEntry } from '../services/contentful'

type Props = {
  name?: string
  src: string
  link?: string
  maxWidth?: number
  alignSelf?: 'left' | 'center' | 'right'
}

export const ControlledImage: FunctionComponent<Props> =
  ({ name, src, link, maxWidth, alignSelf }) => {
    const url = src + (maxWidth ? `?w=${maxWidth}` : '')
    const buttonBaseProps: any = {}
    if (link && link.match(/^(https|http|tel|mailto):/)) {
      buttonBaseProps.component = 'a'
    } else if (link) {
      buttonBaseProps.component = Link
    }

    return (
      <Box
        marginBottom={'3px'}
        alignSelf={alignSelf}
        maxWidth={(theme) => maxWidth || `calc(100% - ${theme.spacing(2)})`}
      >
        <ButtonBase {...buttonBaseProps} to={link} href={link} >
          <img style={{ width: '100%' }} src={url} alt={name} />
        </ButtonBase>
      </Box>
    )
  }

export type ControlledImageData = {
  name: string
  image: Asset
  link?: string
  maxWidth?: number
  alignSelf?: 'left' | 'center' | 'right'
}

type ContentfulControlledImageProps = {
  id: string
  entry?: Entry<ControlledImageData>
}

export const ContentfulControlledImage: FunctionComponent<ContentfulControlledImageProps> =
  ({ id, entry }) => {
    const { data } = useEntry(id, null, entry)

    if (!!data) {
      return (
        <ControlledImage
          name={data.name}
          src={data.image.fields.file.url}
          link={data.link}
          maxWidth={data.maxWidth}
          alignSelf={data.alignSelf}
        />
      )
    } else {
      return (<Loading height="200px" />)
    }
  }
