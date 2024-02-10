import { SxProps, Theme } from '@mui/material'

export const DefaultSx: SxProps<Theme> = {
  minWidth: { xs: 'auto', sm: '250px !important' },
  margin: { xs: '3px 0', sm: '3px 10px !important' },
  flex: { xs:'0 0 100%', sm: '1 !important' }
}

export const FullWidthSx: SxProps<Theme> = {
  flex: '0 0 100%',
  margin: '10px 0'
}
