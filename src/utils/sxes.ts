import { SxProps, Theme } from '@mui/material'

export function sxes(arr: (SxProps<Theme> | undefined | false)[]): SxProps<Theme> {
  return arr.filter(s => !!s).map(s => s as SxProps<Theme>).reduce((a, b) => b ? Object.assign(a as any, b) : a, {} as SxProps<Theme>)
}
