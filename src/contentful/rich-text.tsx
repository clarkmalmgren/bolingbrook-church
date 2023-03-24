import { Box, Link, SxProps, Theme, Typography } from '@mui/material'
import { EntryFields, RichTextContent } from 'contentful'
import { forwardRef, FunctionComponent } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { sxes } from '../utils/sxes'
import { EmbeddedEntry } from './embedded'
import { Unknown } from './unknown'

const SxMarks: { [ mark: string ]: SxProps<Theme> } = {
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  underline: { textDecoration: 'underline' },
  code: { fontFamily: 'monospace' }
}

function marks2Sx(marks?: RichTextContent['marks']): SxProps<Theme> {
  return sxes((marks || []).map(m => SxMarks[m.type]).filter(c => !!c))
}

const ListStyle: SxProps<Theme> = {
  paddingInlineStart: '25px',

  '& li:not(:first-of-type)': {
    marginTop: '6px'
  }
}

type Props = {
  content?: EntryFields.RichText
  className?: string
  sx?: SxProps<Theme>
}

function renderNode(node: RichTextContent, key: string, dense?: boolean): JSX.Element | null {
  const children = (dense?: boolean) => {
    if (node.content) {
      return node.content.map((c: any, index: number) => renderNode(c, `${key}.${index}`, dense))
    } else {
      return null
    }
  }

  switch (node.nodeType as string) {
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
      return (<Box component="span" key={key} sx={marks2Sx(node.marks)}>{node.value}</Box>)

    case 'unordered-list':
      return (<Box component="ul" key={key} sx={ListStyle}>{children()}</Box>)

    case 'ordered-list':
      return (<Box component="ol" type="1" key={key} sx={ListStyle}>{children()}</Box>)

    case 'list-item':
      return (
        // <li key={key}><Typography variant="inherit">{children(true)}</Typography></li>
        <li key={key}>{children(true)}</li>
      )

    case 'hyperlink':
      const linkProps: any = (node.data.uri?.match(/^(https|http|tel|mailto):/)) ?
        { href: node.data.uri } :
        { component: forwardRef((props: any, ref) => { return (<RouterLink to={node.data.uri as string} {...props} ref={ref}/>) }) }

      return (<Link key={key} sx={marks2Sx(node.marks)} {...linkProps}>{children()}</Link>)

    case 'hr':
      return (<hr key={key} style={{ border: 'solid black 0.5px' }} />)

    case 'embedded-entry-block':
      return node.data.target?.sys.id ? (<EmbeddedEntry key={key} id={node.data.target.sys.id} />) : null

    case 'embedded-entry-inline':
      return node.data.target?.sys.id ? (<EmbeddedEntry key={key} id={node.data.target.sys.id} />) : null

    case 'embedded-asset-block':
      const fields = (node.data.target as any)?.fields
      return <Box
                component="img"
                key={key}
                src={fields?.file?.url}
                alt={fields?.title}
                sx={{ maxWidth: (theme) => `calc(100% - ${theme.spacing(2)})` }}
              />
      
    default:
      return (<Unknown data={node} />)
  }
}

export const ContentfulRichText: FunctionComponent<Props> =
  ({content, sx, className}) => {
    if (!content) { return null }

    return (
      <Box key='0' className={className} sx={sx} >
        { content.content.map((c, i) => renderNode(c, `0.${i}`)) }
      </Box>
    )
  }
