import * as React from 'react'
import classNames from 'classnames'
import { Typography, List, ListItem } from '@material-ui/core'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { getEntry, findEntry } from '../services/contentful'
import Box from './box'
import Button from './button'
import Youtube from './youtube'

type MarkType =  'bold' | 'italic' | 'underline' | 'code'

const styles = createStyles({
  bold: { fontWeight: 'bold' },
  italic: { fontStyle: 'italic' },
  underline: { textDecoration: 'underline' },
  code: { fontFamily: 'monospace' }
})

interface ContentProps extends WithStyles<typeof styles> {
  name?: string
  id?: string
}

interface ContentState {
  data?: any
}

type MatchArgs<T> = {
  [regex: string]: (groups: string[]) => T
}

function match<T>(s: string, matchers: MatchArgs<T>): T | null {
  for (let r in matchers) {
    const matched = s.match(r)
    if (matched) {
      return matchers[r](matched.slice(1))
    }
  }
  return null
}

class Content extends React.PureComponent<ContentProps, ContentState> {

  state = {} as ContentState

  componentWillMount() {
    if (this.props.name) {
      findEntry({ content_type: 'staticPage', 'fields.pageName': this.props.name })
        .then(e => { this.setState({ data: e[0] }) })
    } else if (this.props.id) {
      getEntry(this.props.id)
        .then(e => this.setState({ data: e }))
    } else {
      throw new Error("Need to include either a 'name' or 'id' attribute on <Content>")
    }
  }

  renderNode(node: any, key: string = "0", dense?: boolean) {
    const children = (dense?: boolean) => node.content.map((c: any, index: number) => this.renderNode(c, `${key}.${index}`, dense))

    return match(node.nodeType, {
      'document': () => (<Box key={key}>{children()}</Box>),

      'heading-(\\d)': ([k]) => {
        const variant = `h${k}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
        return (<Typography key={key} variant={variant}>{children()}</Typography>)
      },
      
      'paragraph': () => {
        const variant = dense ? 'inherit' : 'body2'
        return (<Typography key={key} variant={variant}>{children()}</Typography>)
      },
      
      'text': () => {
        const classes = (node.marks || []).map((m: {type: MarkType}) => this.props.classes[m.type])
        return (<span key={key} className={classNames(classes)}>{node.value}</span>)
      },

      'hyperlink': () => (<Button key={key} variant="contained" link={node.data.uri}>{children()}</Button>),

      'unordered-list': () => (<List key={key} dense={true}>{children()}</List>),

      'list-item': () => (<ListItem key={key}>{children(true)}</ListItem>),

      'embedded-entry-block': () => (<Youtube key={key} id={node.data.target.fields.id} />),
      
      '.*': () => {
        console.log(node)
        return (<code key={key}>{JSON.stringify(node)}</code>)
      }
    })
  }

  render() {
    return this.state.data ? this.renderNode(this.state.data.content) : null
  }
}

export default withStyles(styles)(Content)