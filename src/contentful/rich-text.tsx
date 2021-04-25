import { Link, Typography } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import classNames from 'classnames'
import { EntryFields, RichTextContent } from 'contentful'
import React, { FunctionComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { EmbeddedEntry } from './embedded'
import { Unknown } from './unknown'

type MarkType =  'bold' | 'italic' | 'underline' | 'code'

const styles = createStyles({
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  underline: { textDecoration: 'underline' },
  code: { fontFamily: 'monospace' },

  list: {
    paddingInlineStart: '25px',

    '& li:not(:first-child)': {
      marginTop: '6px'
    }
  },

  hr: {
    border: 'solid black 0.5px'
  }
})

interface Props extends WithStyles<typeof styles> {
  content?: EntryFields.RichText
  className?: string
}

function renderNode(node: RichTextContent, classes: Props['classes'], key: string, dense?: boolean): JSX.Element | null {
  const children = (dense?: boolean) => {
    if (node.content) {
      return node.content.map((c: any, index: number) => renderNode(c, classes, `${key}.${index}`, dense))
    } else {
      return null
    }
  }

  switch (node.nodeType) {
    case "heading-1":
    case "heading-2":
    case "heading-3":
    case "heading-4":
    case "heading-5":
    case "heading-6":
      const hv = 'h' + node.nodeType.charAt(node.nodeType.length - 1) as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (<Typography key={key} variant={hv}>{children()}</Typography>)

    case 'paragraph':
      return (<Typography key={key} variant={dense ? 'inherit' : 'body2'}>{children()}</Typography>)

    case 'text':
      const textClassList = (node.marks || []).map((m: {type: MarkType}) => classes[m.type])
      return (<span key={key} className={classNames(textClassList)}>{node.value}</span>)

    case 'unordered-list':
      return (<ul key={key} className={classes.list}>{children()}</ul>)

    case 'ordered-list':
      return (<ol type="1" key={key} className={classes.list}>{children()}</ol>)

    case 'list-item':
      return (
        <li key={key}><Typography variant="inherit">{children(true)}</Typography></li>
      )

    case 'hyperlink':
      const linkClassList = (node.marks || []).map((m: {type: MarkType}) => classes[m.type])
      const linkProps: any = (node.data.uri?.match(/^(https|http|tel|mailto):/)) ?
        { href: node.data.uri } :
        { component: React.forwardRef((props: any, ref) => { return (<RouterLink to={node.data.uri as string} {...props} ref={ref}/>) }) }

      return (<Link key={key} className={classNames(linkClassList)} {...linkProps}>{children()}</Link>)

    case 'hr':
      return (<hr key={key} className={classes.hr} />)

    case 'embedded-entry-block':
      return node.data.target?.sys.id ? (<EmbeddedEntry key={key} id={node.data.target.sys.id} />) : null

    case 'embedded-entry-inline':
      return node.data.target?.sys.id ? (<EmbeddedEntry key={key} id={node.data.target.sys.id} />) : null
      
    default:
      return (<Unknown data={node} />)
  }
}

const UnstyledContentfulRichText: FunctionComponent<Props> =
  ({content, classes, className}) => {
    if (!content) { return null }

    return (
      <div key='0' className={className}>
        { content.content.map((c, i) => renderNode(c, classes, `0.${i}`)) }
      </div>
    )
  }

export const ContentfulRichText = withStyles(styles)(UnstyledContentfulRichText)
