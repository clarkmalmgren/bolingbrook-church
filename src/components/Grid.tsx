
import { FunctionComponent } from 'react'
import { ContentChild, MediaChild, TextChild } from './Flex'
import { Box, useTheme } from '@mui/material'
import { MediaById } from './dynamic/MediaById'
import { ComponentById } from './dynamic/ComponentById'
import { RichText } from './RichText'

export type GridLocator = {
  row?: number
  col?: number
  rowSpan?: number
  colSpan?: number
}

export type GridChild =
  (MediaChild | TextChild | ContentChild) & GridLocator

export type GridProps = {
  children?: GridChild[]
  colWidths?: string
  gap?: number
  defaultWidth?: string
  defaultHeight?: string
}

function target(start?: number, span?: number): string | undefined {
  if (typeof start === 'undefined') {
    return undefined
  } else if (span && span > 1) {
    return `${start} / ${start + span}`
  } else {
    return start.toString()
  }
}

export const Grid: FunctionComponent<GridProps> =
  ({ children, colWidths, gap, defaultHeight, defaultWidth }) => {
    const _gap = typeof gap === 'undefined' ? 1 : gap

    return (
      <Box
        display="grid"
        gap={_gap}
        gridAutoColumns={ defaultWidth }
        gridAutoRows={ defaultHeight }
        gridTemplateColumns={ colWidths }
        alignItems="center"
      >
        { children?.map((c, i) => 
          <Box
            key={i}
            gridColumn={ target(c.col, c.colSpan) }
            gridRow={ target(c.row, c.rowSpan) }
          >
            { c.type === 'media'   && <MediaById id={c.ref} /> }
            { c.type === 'text'    && <RichText data={c.body} />}
            { c.type === 'content' && <ComponentById key={i} id={c.ref} />}
          </Box>
        )}
      </Box>
    )
  }
