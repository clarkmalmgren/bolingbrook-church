'use client'

import { MutationButton } from '@/components/MutationButton'
import { Random } from '@/services/utils/Random'
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, SxProps, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FunctionComponent, PropsWithChildren, createContext, useRef, useState } from 'react'

export type DataState = { [key: string]: { value: any, invalid?: boolean } }

export function toDataState(data: { [key: string]: any } | undefined): DataState {
  if (!data) { return {} }
  const ds: DataState = {}
  Object.keys(data).forEach(k => { ds[k] = { value: data[k] } })
  return ds
}

export type FormContextData = {
  data: DataState
  setValue: (key: string, value: any, invalid?: boolean) => void
}

export const FormContext = createContext<FormContextData>({data: {}, setValue: () => {}})

export type FormResponse = {
  ok: boolean
  code?: number
  json(): Promise<any>
  bodyString(): Promise<string>
}

export type ErrorOutput = { message: string, severity: 'error' | 'warning' }
export type ErrorMapper = (response: FormResponse, message?: string) => ErrorOutput

export type FormProps = {
  open: boolean
  onChange?: (data: { [key: string]: any }) => void
  onClose?: () => void
  onSuccess?: () => void
  redirectOnSuccess?: (data: { [key: string]: any }, json: { [key: string]: any }) => string | undefined
  keepDataOnSuccess?: boolean
  loading: boolean
  requireAuth?: boolean
  authMessage?: string
  title: string
  initialData?: DataState
  submit: (data: { [key: string]: any }) => Promise<FormResponse>
  errorMapper?: ErrorMapper
  errorTimeout?: number
  submitText?: string
  variant?: 'dialog' | 'paper'
  sx?: SxProps

  /* If set, this flips the colors in the form to indicate the "submit" action is red  */
  destructive?: boolean
}

const DefaultErrorMapper: ErrorMapper =
  (response: FormResponse) => ({ severity: 'error', message: `Failed to submit request (code: ${response.code})` })

const EmptyFailedResponse: FormResponse = {
  ok: false,
  bodyString: async () => { return '' },
  json: async () => { return {} }
}

export const EmptySuccessResponse: FormResponse = {
  ok: true,
  bodyString: async () => { return '' },
  json: async () => { return {} }
}

export const Form: FunctionComponent<PropsWithChildren<FormProps>> =
  (props) => {
    const router = useRouter()
    const [ error, setError ] = useState<ErrorOutput | undefined>(undefined)
    // const [ data, setData ] = useState<DataState>(props.initialData || {})
    const [ x, setX ] = useState<number>(0)
    const data = useRef<DataState>(props.initialData || {})

    const ctx: FormContextData = {
      data: data.current,
      setValue: (key: string, value: any, invalid?: boolean) => {
        const next = { ...data.current, [key]: { value, invalid }}
        data.current = next
        setX(Random.rand())

        if (props.onChange) {
          const payload: Record<string, any> = {}
          Object.keys(next).forEach(k => { payload[k] = next[k].value })
          props.onChange(payload)
        }
      }
    }

    const disabled = !!Object.values(data.current).find(({ invalid }) => !!invalid )

    function onError(response: FormResponse, message: string | undefined) {
      const out = (props.errorMapper || DefaultErrorMapper)(response, message)
      setError(out)
      if (props.errorTimeout && props.errorTimeout > 0) {
        setTimeout(() => setError(undefined), props.errorTimeout)
      }
    }

    async function save() {
      if (disabled || props.loading) { return }
      setError(undefined)
      try {
        const payload: Record<string, any> = {}
        Object.keys(data.current).forEach(k => { payload[k] = data.current[k].value })
        const response = await props.submit(payload)
        if (response.ok) {
          props.onClose?.()
          props.onSuccess?.()
          const json = await response.json() as { [key: string]: any }
          const redirect = props.redirectOnSuccess?.(payload, json)
          redirect && router.push(redirect)
          if (!props.keepDataOnSuccess) {
            data.current = {}
          }
        } else {
          const msg = await response.bodyString()
          onError(response, msg)
        }
      } catch (e) {
        onError(EmptyFailedResponse, '' + e)
      }
    }
    
    if (props.variant === 'paper') {
      return (
        <FormContext.Provider value={ctx}>
          <Paper component="form" sx={props.sx} >
            <Typography variant="h4" sx={{ mb: 2 }}>{props.title}</Typography>
            { props.children }
            { error && <Alert severity={error.severity}>{error.message}</Alert> }
            
            <Box textAlign="right" sx={{ mt: 1 }}>
              <MutationButton
                cancel={props.destructive}
                loading={props.loading}
                submit={save}
                disabled={disabled}
              >
                { props.submitText || 'Submit' }
              </MutationButton>
            </Box>
          </Paper>
        </FormContext.Provider>
      )
    } else {
      return (
        <FormContext.Provider value={ctx}>
          <Dialog open={props.open} onClose={props.onClose} component="form">
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
              { props.children }
              { error && <Alert severity={error.severity}>{error.message}</Alert> }
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button variant="contained" color={props.destructive ? 'inherit' : 'error'} onClick={() => props.onClose?.()}>Cancel</Button>
              <Box flex="1"/>
              <MutationButton
                cancel={props.destructive}
                loading={props.loading}
                submit={save}
                disabled={disabled}
              >
                { props.submitText || 'Submit' }
              </MutationButton>
            </DialogActions>
          </Dialog>
        </FormContext.Provider>
      )
    }
  }
