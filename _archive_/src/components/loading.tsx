import { FunctionComponent } from 'react'
import { Box, CircularProgress } from '@mui/material'

type Props = {
  height?: string
}

export const Loading: FunctionComponent<Props> =
  ({ height }) => {
    const calculatedHeight = height ? height : '300px'

    return (
      <Box sx={{
        width: '100%',
        textAlign: 'center',
        margin: '0',
        height: calculatedHeight
      }}>
        <Box sx={{
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          <CircularProgress />
        </Box>
      </Box>
    )
  }
