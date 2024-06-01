import { FunctionComponent, PropsWithChildren } from 'react'
import { Box, SxProps, Theme } from '@mui/material'

export type SectionProps = {
  sx?: SxProps<Theme>
  wide?: boolean
}

export const Section: FunctionComponent<PropsWithChildren<SectionProps>> =
  ({ sx, wide, children }) => (
    <Box
      sx={sx}
      width="95%"
      mt={2}
      mb={2}
      ml="auto"
      mr="auto"
      maxWidth={ wide ? undefined : '840px'}
    >{children}</Box>
  )
