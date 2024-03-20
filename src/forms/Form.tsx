'use client'

import { MutationButton } from '@/components/MutationButton'
import { Random } from '@/services/utils/Random'
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, SxProps, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FunctionComponent, PropsWithChildren, createContext, useContext, useRef, useState } from 'react'

export type InvalidityTree = {
  [ key: string ]: boolean | InvalidityTree
}

export type DataState = {
  state: { [key: string]: any },
  invalid?: InvalidityTree
}

const EmptyDataSate: DataState = { state: {} }
  
export function toDataState(state: { [key: string]: any } | undefined): DataState {
  return state ? { state } : EmptyDataSate
}

export type FormContextData = {
  data: DataState
  getValue: (key: string | string[]) => any
  setValue: (key: string | string[], value: any, invalid?: boolean) => void
}

export const FormContext = createContext<FormContextData>({
  data: EmptyDataSate,
  getValue: () => {},
  setValue: () => {}
})

type SuccessFormResponse<T> = {
  ok: true
  json(): Promise<T>
}

type FailedFormResponse = {
  ok: false
  bodyString(): Promise<string>
}

export type FormResponse<T = any> = (SuccessFormResponse<T> | FailedFormResponse) & {
  code?: number | string
}

export type ErrorOutput = { message: string, severity: 'error' | 'warning' }
export type ErrorMapper = (response: FormResponse, message?: string) => ErrorOutput

export async function tryResponse<T>(fn: () => Promise<T>): Promise<FormResponse<T>> {
  try {
    const value = await fn()
    return {
      ok: true,
      json: () => Promise.resolve(value)
    }
  } catch (e) {
    const msg = `${e}`
    return {
      ok: false,
      code: msg,
      bodyString: () => Promise.resolve(msg)
    }
  }
}

export type FormProps = {
  open: boolean
  onChange?: (data: { [key: string]: any }, invalid: InvalidityTree | undefined) => void
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
  bodyString: async () => { return '' }
}

export const EmptySuccessResponse: FormResponse = {
  ok: true,
  json: async () => { return {} }
}

function seek(key: string | string[], target: any): any {
  if (!target) {
    return undefined
  } else if (typeof key === 'string') {
    return target[key]
  } else {
    const head = key[0]
    const tail = key.slice(1)
    if (tail.length === 0) {
      return target[head]
    } else {
      return seek(tail, target[head])
    }
  }
}

function merge(key: string | string[], value: any, target: any): any {
  if (typeof key === 'string') {
    return { ...target, [key]: value }
  } else {
    const head = key[0]
    const tail = key.slice(1)
    if (tail.length === 0) {
      return { ...target, [head]: value }
    } else {
      return { ...target, [head]: merge(tail, value, target[head] || {}) }
    }
  }
}

function isInvalid(tree?: InvalidityTree): boolean {
  if (!tree) { return false }
  for (let k in tree) {
    const v = tree[k]
    if (typeof v === 'boolean') {
      if (v) { return true }
    } else {
      if (isInvalid(v)) { return true }
    }
  }
  return false
}

export function useFormField<T>(key: string | string[]): { flat: string, value: T, update: (value: T, invalid?: boolean) => void } {
  const ctx = useContext(FormContext)
  return {
    flat: typeof key === 'string' ? key : key.join('/'),
    value: ctx.getValue(key),
    update: (v, i) => ctx.setValue(key, v, i)
  }
}

export const Form: FunctionComponent<PropsWithChildren<FormProps>> =
  (props) => {
    const router = useRouter()
    const [ error, setError ] = useState<ErrorOutput | undefined>(undefined)
    // const [ data, setData ] = useState<DataState>(props.initialData || {})
    const [ x, setX ] = useState<number>(0)
    const data = useRef<DataState>(props.initialData || EmptyDataSate)

    const ctx: FormContextData = {
      data: data.current,
      getValue: (key: string | string[]) => seek(key, data.current.state),
      setValue: (key: string | string[], value: any, invalid?: boolean) => {
        const next: DataState =  {
          state: merge(key, value, data.current.state),
          invalid: merge(key, !!invalid, data.current.invalid || {})
        }
        data.current = next
        setX(Random.rand())

        if (props.onChange) {
          props.onChange(next.state, next.invalid)
        }
      }
    }

    const disabled = isInvalid(data.current.invalid)

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
        const response = await props.submit(data.current.state)
        if (response.ok) {
          props.onClose?.()
          props.onSuccess?.()
          const json = await response.json() as { [key: string]: any }
          const redirect = props.redirectOnSuccess?.(data.current.state, json)
          redirect && router.push(redirect)
          if (!props.keepDataOnSuccess) {
            data.current = EmptyDataSate
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
                color={props.destructive ? 'error' : 'primary'}
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
                color={props.destructive ? 'error' : 'primary'}
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
