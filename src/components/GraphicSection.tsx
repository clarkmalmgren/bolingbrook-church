import { OutputData } from '@editorjs/editorjs'
import { Box, ButtonBase, SxProps, Theme } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { BackgroundMediaById, MediaById } from './DynamicComponent'
import { RichText } from './RichText'

export type GraphicSectionProps = {
  image: string
  displayStyle: 'Collapse' | 'Full' | 'Page Width'
  content: OutputData
  shade: number
  link?: string
  colorScheme?: 'black on white' | 'white on black'
  alignment?: 'left' | 'right'
  imagePosition?: string
}

const BaseStyles: { [name: string]: SxProps<Theme> } = {
  root: {
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white',
    maxWidth: '800px',
    margin: '20px auto 0'
  },

  fullContent: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '100%',
  },

  fullShade: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '100%'
  },
  
  content: {
    padding: '40px'
  }
}

export const GraphicSection: FunctionComponent<GraphicSectionProps> =
  (props) => {
    const { image, displayStyle, content, shade, link, colorScheme, alignment, imagePosition } = props

    if (displayStyle === 'Full') {
      const buttonBaseProps: any = { }
      if (link?.match(/^(https|http|tel|mailto):/)) {
        buttonBaseProps.component = 'a'
      } else if (link) {
        buttonBaseProps.component = Link
      }

      return (
        <Box sx={BaseStyles.root}>
          <ButtonBase {...buttonBaseProps} to={link} href={link} >
            <MediaById id={image} style={{ width: '100%' }} />
            <Box sx={BaseStyles.fullShade} style={{backgroundColor: `rgba(0,0,0,${shade})`}}></Box>
            <Box sx={BaseStyles.fullContent}>
              <Box sx={BaseStyles.content}>
                <RichText data={content} />
              </Box>
            </Box>
          </ButtonBase>
        </Box>
      )
    } else if (displayStyle === 'Page Width') {
      return (<PageWidthGraphicsSection {...props} />)
    } else {
      return (
      <BackgroundMediaById sx={BaseStyles.root} id={image}>
        <div style={{backgroundColor: `rgba(0,0,0,${shade})`}}>
          <Box sx={BaseStyles.content}>
            <RichText data={content} />
          </Box>
        </div>
      </BackgroundMediaById>
      )
    }
  }

function fadeGradient(deg: number, rgb: number): { background: string } {
  return { background: `linear-gradient(${deg}deg, rgba(${rgb},${rgb},${rgb},0) 0%, rgba(${rgb},${rgb},${rgb},1) 100%)` }
}

const PageWidthStyles: { [name: string]: SxProps<Theme> } = {
  root: {
    display: 'flex',
    width: '100%',
    flexFlow: { xs: 'column nowrap', sm: 'row nowrap' },
    minHeight: '30vh',
    mt: 2,

    "&.black": { background: 'black' },
    overflow: 'hidden'
  },

  image: {
    flex: { xs: '300px', sm: 6 },
    backgroundSize: 'cover',
    position: 'relative'
  },

  fade: {
    position: 'absolute',
    top: { xs: 'initial', sm: 0 },
    bottom: 0,
    left: -1,
    right: { xs: 0, sm: 'initial' },
    width: { xs: 'initial', sm: '30%' },
    height: { xs: '30%', sm: 'initial' },
    alignSelf: 'center',

    "&.black": { xs: fadeGradient(180, 0), sm: fadeGradient(90, 0) },
    "&.white": { xs: fadeGradient(180, 255), sm: fadeGradient(90, 255) },

    "&.left": { transform: 'scaleX(-1)' },
    "&.right": {
      right: -1,
      left: { xs: 0, sm: 'initial' }
    },
  },
  
  content: {
    flex: 4,
    p: 2,
    alignSelf: 'center',
    
    "&.white": { color: 'black', background: 'white' },
    "&.black": { color: 'white', background: 'black' },
    "&.left": { order: { xs: 'initial', sm: -1 } }
  }
}

type PageWidthGraphicsSectionProps = Pick<GraphicSectionProps, 'colorScheme' | 'alignment' | 'image' | 'imagePosition' | 'content'>

const PageWidthGraphicsSection: FunctionComponent<PageWidthGraphicsSectionProps> =
  ({ colorScheme, alignment, image, imagePosition, content }) => {
    const bgColor = colorScheme === 'black on white' ? 'white' : 'black'
    const align = alignment || 'left'
    const className = `${bgColor} ${align}`

    return (
      <Box sx={PageWidthStyles.root} className={bgColor}>
        <BackgroundMediaById id={image} sx={{ ...PageWidthStyles.image, backgroundPosition: imagePosition || 'center' }}>
          <Box sx={PageWidthStyles.fade} className={className} />
        </BackgroundMediaById>
        <Box sx={PageWidthStyles.content} className={className}>
          <RichText data={content} />
        </Box>
      </Box>
    )
  }
