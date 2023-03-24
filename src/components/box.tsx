import { FunctionComponent, PropsWithChildren } from 'react'
import { Box, SxProps, Theme } from '@mui/material'
import { sxes } from '../utils/sxes'

const SectionSx: SxProps<Theme> = {
  width: '95%',
  maxWidth: '840px',
  margin: '20px auto'
}

const WideSectionSx: SxProps<Theme> = {
  width: '95%',
  margin: '20px auto'
}

export type BoxProps = {
  sx?: SxProps<Theme>
  variant?: 'section' | 'wide-section'
}

export const BCBox: FunctionComponent<PropsWithChildren<BoxProps>> =
  ({ sx, variant, children }) => {
    return (<Box sx={sxes([variant === 'wide-section' ? WideSectionSx : SectionSx, sx ])}>{children}</Box>)
  }
