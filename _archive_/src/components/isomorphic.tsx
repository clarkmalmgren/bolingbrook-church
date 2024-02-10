import { SxProps, Theme } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import { sxes } from '../utils/sxes'
import { BCBox }from './box'

type TLength = string | 0

interface Props {
  sx?: SxProps<Theme>
  maxWidth?: TLength
  aspectRatio: number
}

export const Isomorphic: FunctionComponent<PropsWithChildren<Props>> =
  ({ sx, maxWidth, aspectRatio, children }) => {
    return (
      <BCBox sx={sxes([ { maxWidth }, sx ])}>
        <BCBox sx={{
          width: '100%',
          paddingTop: `${100/aspectRatio}%`,
          position: 'relative'
        }}>
          <BCBox sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          }}>
            {children}
          </BCBox>
        </BCBox>
      </BCBox>
    )
  }
