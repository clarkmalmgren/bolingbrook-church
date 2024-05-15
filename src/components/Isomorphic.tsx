import { sxes } from '@/services/utils/sxes'
import { Box, SxProps, Theme } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'

type TLength = string | 0

interface Props {
  sx?: SxProps<Theme>
  maxWidth?: TLength
  aspectRatio: number
}

export const Isomorphic: FunctionComponent<PropsWithChildren<Props>> =
  ({ sx, maxWidth, aspectRatio, children }) => {
    return (
      <Box sx={sxes([ { maxWidth }, sx ])}>
        <Box sx={{
          width: '100%',
          paddingTop: `${100/aspectRatio}%`,
          position: 'relative'
        }}>
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}>
            {children}
          </Box>
        </Box>
      </Box>
    )
  }
