import { CSSProperties, FunctionComponent } from 'react'
import { Entry, EntryFields, Asset } from 'contentful'
import { Theme, ButtonBase, SxProps, Box } from '@mui/material'
import { ContentfulRichText } from './rich-text'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

export interface GraphicSectionData {
  name: string
  image: Asset
  displayStyle: 'Collapse' | 'Full' | 'Page Width'
  content: EntryFields.RichText
  shade: number
  link: string
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

type Props = {
  entry: Entry<GraphicSectionData>
}

export const GraphicSection: FunctionComponent<Props> =
  ({ entry }) => {
    const url = entry.fields.image.fields.file.url + '?w=800'

    if (entry.fields.displayStyle === 'Full') {
      const buttonBaseProps: any = { }
      if ((entry.fields.link && entry.fields.link.match(/^(https|http|tel|mailto):/))) {
        buttonBaseProps.component = 'a'
      } else if (entry.fields.link) {
        buttonBaseProps.component = Link
      }

      return (
        <Box sx={BaseStyles.root}>
          <ButtonBase {...buttonBaseProps} to={entry.fields.link} href={entry.fields.link} >
            <img style={{ width: '100%' }} src={url} alt={entry.fields.name} />
            <Box sx={BaseStyles.fullShade} style={{backgroundColor: `rgba(0,0,0,${entry.fields.shade})`}}></Box>
            <Box sx={BaseStyles.fullContent}>
              <ContentfulRichText sx={BaseStyles.content} content={entry.fields.content}/>
            </Box>
          </ButtonBase>
        </Box>
      )
    } else if (entry.fields.displayStyle === 'Page Width') {
      return (<PageWidthGraphicsSection url={url} entry={entry} />)
    } else {
      return (
      <Box sx={BaseStyles.root} style={{backgroundImage: `url(${url})`}}>
        <div style={{backgroundColor: `rgba(0,0,0,${entry.fields.shade})`}}>
          <ContentfulRichText sx={BaseStyles.content} content={entry.fields.content}/>
        </div>
      </Box>
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

type PageWidthProps = {
  entry: Entry<GraphicSectionData>
  url: string
}

const PageWidthGraphicsSection: FunctionComponent<PageWidthProps> =
  ({ entry, url }) => {
    const bgColor = entry.fields.colorScheme === 'black on white' ? 'white' : 'black'
    const alignment = entry.fields.alignment || 'left'
    const style: CSSProperties = {
      backgroundImage: `url(${url})`,
      backgroundPosition: entry.fields.imagePosition || 'center'
    }

    return (
      <Box sx={PageWidthStyles.root} className={bgColor}>
        <Box sx={PageWidthStyles.image} style={style}>
          <Box sx={PageWidthStyles.fade} className={classNames(bgColor, alignment)} />
        </Box>
        <ContentfulRichText sx={PageWidthStyles.content} className={classNames(bgColor, alignment)} content={entry.fields.content}/>
      </Box>
    )
  }