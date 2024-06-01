import { OutputData } from '@editorjs/editorjs'
import { Box } from '@mui/material'
import { CSSProperties, FunctionComponent } from 'react'
import { MediaById } from './dynamic/MediaById'
import { ComponentById } from './dynamic/ComponentById'
import { RichText } from './RichText'

export type ContentChild = { type: 'content', ref: string  }
export type MediaChild = { type: 'media', ref: string }
export type TextChild = { type: 'text', body: OutputData }
export type Break = { type: 'break' }

export type FlexChild =
  Break |
  ((MediaChild | TextChild | ContentChild) & {
    flex?: string | number
    minWidth?: number
  })

export type FlexProps = {
  direction?: 'row' | 'column'
  wrap?: boolean
  children?: FlexChild[]
}

const ColBreakStyle: CSSProperties = { flex: '100%', height: 0 }
const RowBreakStyle: CSSProperties = { flex: '100%', width: 0 }

export const Flex: FunctionComponent<FlexProps> =
  ({ direction, wrap, children }) => (
    <Box
      display="flex"
      flexDirection={direction}
      flexWrap={ wrap ? 'wrap' : 'nowrap' }
      gap={3}
      alignItems="center"
    >
      { children?.map((c, i) => {
        if (c.type === 'break') {
          return <div key={i} style={ direction === 'row' ? RowBreakStyle : ColBreakStyle } />
        }

        return (
          <div key={i} style={{ flex: c.flex, minWidth: c.minWidth }}>
            { c.type === 'media'   && <MediaById id={c.ref} /> }
            { c.type === 'text'    && <RichText data={c.body} />}
            { c.type === 'content' && <ComponentById key={i} id={c.ref} />}
          </div>
        )
      })}
    </Box>
  )
