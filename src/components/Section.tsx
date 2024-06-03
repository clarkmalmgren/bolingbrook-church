import { FunctionComponent, PropsWithChildren } from 'react'
import { Box, SxProps, Theme } from '@mui/material'
import { sxes } from '@/services/utils/sxes'

export type SectionProps = {
  sx?: SxProps<Theme>
  wide?: boolean
  bgcolor?: 'white' | 'gray' | 'dark'
  align?: 'left' | 'center' | 'right'
  dense?: boolean
}

const BgLookup = {
  gray: '#4D546D',
  dark: '#2C3040',
  white: undefined
}

const ColorLookup = {
  gray: 'white',
  dark: 'white',
  white: undefined
}

export const Section: FunctionComponent<PropsWithChildren<SectionProps>> =
  ({ sx, wide, bgcolor, align, dense, children }) => {
    const outer: SxProps<Theme> = {
      background: bgcolor ? BgLookup[bgcolor] : undefined,
      color: bgcolor ? ColorLookup[bgcolor] : undefined,
      pt: dense ? undefined : 3,
      pb: dense ? undefined : 3
    }

    const inner: SxProps = {
      width: '95%',
      ml: 'auto',
      mr: 'auto',
      maxWidth: wide ? undefined : 840,
      textAlign: align || 'left'
    }
    
    return (
      <Box sx={outer}>
        <Box sx={sxes([inner, sx])}>
          {children}
        </Box>
      </Box>
    )
  }

