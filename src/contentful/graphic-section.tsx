import React, { FunctionComponent } from 'react'
import { Entry, EntryFields, Asset } from 'contentful'
import { createStyles, withStyles, WithStyles, ButtonBase } from '@material-ui/core'
import { ContentfulRichText } from './rich-text'
import { Link } from 'react-router-dom'

export interface GraphicSectionData {
  name: string
  image: Asset
  displayStyle: 'Collapse' | 'Full'
  content: EntryFields.RichText
  shade: number
  link: string
}

const styles = createStyles({
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
})

interface Props extends WithStyles<typeof styles> {
  entry: Entry<GraphicSectionData>
}

const UnstyledGraphicSection: FunctionComponent<Props> =
  ({entry, classes}) => {
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

export const GraphicSection = withStyles(styles)(UnstyledGraphicSection)
