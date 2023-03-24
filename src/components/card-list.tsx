import { Box } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'

export const CardList: FunctionComponent<PropsWithChildren<{}>> =
  ({ children }) => {
    return (
      <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center' }}>
        { children }
      </Box>
    )
  }

