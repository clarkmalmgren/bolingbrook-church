import React, { CSSProperties, FunctionComponent } from 'react'
import { Entry, EntryFields, Asset } from 'contentful'
import { Theme, ButtonBase } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      maxWidth: '800px',
      margin: '20px auto 0'
    },

    image: {
      width: '100%'
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
  }))

type Props = {
  entry: Entry<GraphicSectionData>
}

export const GraphicSection: FunctionComponent<Props> =
  ({ entry }) => {
    const classes = useStyles()
    const url = entry.fields.image.fields.file.url + '?w=800'

    if (entry.fields.displayStyle === 'Full') {
      const buttonBaseProps: any = { }
      if ((entry.fields.link && entry.fields.link.match(/^(https|http|tel|mailto):/))) {
        buttonBaseProps.component = 'a'
      } else if (entry.fields.link) {
        buttonBaseProps.component = Link
      }

      
      return (
        <div className={classes.root}>
          <ButtonBase {...buttonBaseProps} to={entry.fields.link} href={entry.fields.link} >
            <img className={classes.image} src={url} alt={entry.fields.name} />
            <div className={classes.fullShade} style={{backgroundColor: `rgba(0,0,0,${entry.fields.shade})`}}></div>
            <div className={classes.fullContent}>
              <ContentfulRichText className={classes.content} content={entry.fields.content}/>
            </div>
          </ButtonBase>
        </div>
      )
    } else if (entry.fields.displayStyle === 'Page Width') {
      return (<PageWidthGraphicsSection url={url} entry={entry} />)
    } else {
      return (
      <div className={classes.root} style={{backgroundImage: `url(${url})`}}>
        <div style={{backgroundColor: `rgba(0,0,0,${entry.fields.shade})`}}>
          <ContentfulRichText className={classes.content} content={entry.fields.content}/>
        </div>
      </div>
      )
    }
  }


const usePageWidthStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      width: '100%',
      flexFlow: 'row nowrap',
      minHeight: '30vh',
      marginTop: theme.spacing(2),

      [theme.breakpoints.down('sm')]: {
        flexFlow: 'column nowrap'
      },

      "&.black": { background: 'black' },
      overflow: 'hidden'
    },

    image: {
      flex: 6,
      backgroundSize: 'cover',
      position: 'relative',

      [theme.breakpoints.down('sm')]: {
        flex: '300px'
      }
    },

    fade: {
      position: 'absolute',
      top: 0, bottom: 0,
      width: '30%',
      alignSelf: 'center',

      "&.black": { background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)' },
      "&.white": { background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)' },

      "&.left": { left: -1, transform: 'scaleX(-1)' },
      "&.right": { right: -1 },

      [theme.breakpoints.down('sm')]: {
        top: 'initial', width: 'initial',
        left: 0, right: 0,
        height: '30%',

        "&.black": { background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)' },
        "&.white": { background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)' }
      }
    },
    
    content: {
      flex: 4,
      padding: theme.spacing(2),
      alignSelf: 'center',
      
      "&.white": { color: 'black', background: 'white' },
      "&.black": { color: 'white', background: 'black' },
      "&.left": {
        [theme.breakpoints.up('sm')]: { order: -1 }
      }
    }

  }))

type PageWidthProps = {
  entry: Entry<GraphicSectionData>
  url: string
}

const PageWidthGraphicsSection: FunctionComponent<PageWidthProps> =
  ({ entry, url }) => {
    const classes = usePageWidthStyles()
    const bgColor = entry.fields.colorScheme === 'black on white' ? 'white' : 'black'
    const alignment = entry.fields.alignment || 'left'
    const style: CSSProperties = {
      backgroundImage: `url(${url})`,
      backgroundPosition: entry.fields.imagePosition || 'center'
    }

    return (
      <div className={classNames(classes.root, bgColor)}>
        <div className={classes.image} style={style}>
          <div className={classNames(classes.fade, bgColor, alignment)} />
        </div>
        <ContentfulRichText className={classNames(classes.content, bgColor, alignment)} content={entry.fields.content}/>
      </div>
    )
  }