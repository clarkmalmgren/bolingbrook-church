import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FunctionComponent, useEffect, useRef } from 'react'

type ErrorDialogProps = {
  open: boolean
  onClose: () => void
  duration?: number
}

export const ErrorDialog: FunctionComponent<ErrorDialogProps> =
  ({ open, onClose, duration : propsDuration }) => {
    const duration = propsDuration || 3000
    const lastOpenState = useRef(open)
    const timeout = useRef(undefined as any)

    const close = () => {
      onClose()
      if (timeout.current) {
        clearTimeout(timeout.current)
        timeout.current = undefined
      }
    }

    useEffect(() => {
      if (!lastOpenState.current && open) {
        timeout.current = setTimeout(close, duration)
      }
      lastOpenState.current = open
    }, [ open, lastOpenState, timeout ]) // eslint-disable-line

    return (
      <Dialog open={open} onClose={close}>
        <DialogTitle>Failed to Submit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please try again. Sorry for the inconvenience.
          </DialogContentText>
          <DialogActions>
            <Button onClick={close}>OK</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
