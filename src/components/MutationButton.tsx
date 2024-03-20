import { Box, CircularProgress } from '@mui/material'
import { FunctionComponent, PropsWithChildren, useState } from 'react'
import { ButtonProps, Button } from './Button'

type MutationButtonProps = Omit<ButtonProps, 'link' | 'onClick'> & {
  submit: () => Promise<any>
  onDone?: () => any | void
  spinForMs?: number
}

export const MutationButton: FunctionComponent<PropsWithChildren<MutationButtonProps>> =
  ({ submit, onDone, children, spinForMs, ...rest }) => {
    const [ loading, setLoading ] = useState(false)

    async function onClick() {
      setLoading(true)

      const start = new Date().getTime()
      if (!loading) { await submit() }
      const taken = new Date().getTime() - start

      const remaining = 

      setTimeout(() => {
        setLoading(false)
        onDone?.()
      }, Math.max(0, (spinForMs || 500) - taken))
    }

    return (
      <Button {...rest} onClick={onClick}>
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