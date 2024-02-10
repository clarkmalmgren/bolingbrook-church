import { Box, SxProps, Theme } from '@mui/material'
import { FunctionComponent } from 'react'
import { sxes } from '../utils/sxes'

const BaseSx: SxProps<Theme> = {
  fontFamily: `'Socicon' !important`,
  speak: 'none',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontVariant: 'normal',
  textTransform: 'none',
  lineHeight: 1,
  webkitFontSmoothing: 'antialiased',
  mozOsxFontSmoothing: 'grayscale',
  margin: '0 8px'
}

export type SociconProps = {
  name: string
  sx?: SxProps<Theme>
}

function lookup(key: string): number {
  switch (key) {
    case 'twitter':         return 0xe08d
    case 'instagram':       return 0xe044
    case 'facebook':        return 0xe028
    case 'youtube':         return 0xe0a5
    case 'apple':           return 0xe008
    case 'spotify':         return 0xe079
    case 'googleplaymusic': return 0xe95e
    default:
      try {
        return Number.parseInt(key, 16)
      } catch (e) {
        return 0x0000
      }
  }
}

export const Socicon: FunctionComponent<SociconProps> =
  ({ sx, name }) => (
    <Box sx={sxes([BaseSx, sx])}>
      { String.fromCodePoint(lookup(name)) }
    </Box>
  )
