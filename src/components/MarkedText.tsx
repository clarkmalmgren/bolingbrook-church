import { Link } from '@mui/material'
import NextLink from 'next/link'
import { FunctionComponent } from 'react'

export type MarkedTextProps = {
  text: string
}

export const MarkedText: FunctionComponent<MarkedTextProps> =
  ({ text }) => {
    text = text.replaceAll('&nbsp;', '\xA0')
    const start = text.match(/<(b|a|i)( href="(.*?)")?>/)
    if (!start || typeof start.index == 'undefined') { return text }
    
    const before = text.substring(0, start.index)
    const remaining = text.substring(start.index + start[0].length)

    const end = remaining.indexOf(`</${start[1]}>`)
    if (end < 0) { return `Invalid MarkedText: ${text}` }

    const content = remaining.substring(0, end)
    const after = remaining.substring(end + 4)
    let marked: JSX.Element | undefined = undefined

    switch (start[1]) {
      case 'b':
        marked = (<b><MarkedText text={content}/></b>)
        break
      case 'i':
        marked = (<i><MarkedText text={content}/></i>)
        break
      case 'a':
        marked = (
          <Link component={NextLink} href={start[3]}>
            <MarkedText text={content}/>
          </Link>
        )
        break
    }

    return [
      before,
      marked,
      <MarkedText text={after} />
    ]
  }