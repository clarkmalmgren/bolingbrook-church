import { Paper } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'

export const Example: FunctionComponent<PropsWithChildren<{}>> =
  ({ children }) => (
    <Paper sx={{ m: 2, p: 2 }}>
      {children}
    </Paper>
  )
