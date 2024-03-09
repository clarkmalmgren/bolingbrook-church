import { Box, CircularProgress } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import { ButtonProps, Button } from './Button'

type MutationButtonProps = Omit<ButtonProps, 'link' | 'onclick'> & {
  loading: boolean
  submit: () => Promise<any>
  onDone?: () => any | void
}

export const MutationButton: FunctionComponent<PropsWithChildren<MutationButtonProps>> =
  ({ disabled, fullWidth, cancel, size, loading, submit, onDone, children }) => {
    async function onClick() {
      if (!loading) { await submit() }
      if (onDone) { onDone() }
    }

    return (
      <Button disabled={disabled} fullWidth={fullWidth} cancel={cancel} size={size} onClick={onClick}>
        <Box position="relative">
          <Box sx={{ opacity: loading ? 0 : 1, transition: 'opacity 200ms' }}>
            { children }
          </Box>
          <Box position="absolute" sx={{ left: 0, right: 0, top: 0, bottom: 0, opacity: loading ? 1 : 0, transition: 'opacity 200ms' }}>
            <CircularProgress size={24} />
          </Box>
        </Box>
      </Button>
    )
  }