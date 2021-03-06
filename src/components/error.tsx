import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import React from 'react';

interface ErrorDialogProps {
  open: boolean
  onClose: () => void
  duration: number
}

interface ErrorDialogState {
  timeout: any
}

export class ErrorDialog extends React.PureComponent<ErrorDialogProps, ErrorDialogState> {

  static defaultProps: Pick<ErrorDialogProps, 'duration'> = {
    duration: 3000
  }

  componentDidUpdate(prevProps: ErrorDialogProps) {
    if (!prevProps.open && this.props.open) {
      const timeout = setTimeout(this.close, this.props.duration)
      this.setState({ timeout })
    }
  }

  close = () => {
    this.props.onClose()
    if (this.state.timeout) {
      clearTimeout(this.state.timeout)
      this.setState({ timeout: undefined })
    }
  }

  render() {
    return (
      <Dialog open={this.props.open} onClose={() => this.props.onClose()}>
        <DialogTitle>Failed to Submit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please try again. Sorry for the inconvenience.
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => this.props.onClose()}>OK</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    )
  }
}