'use client'

import { MutationButton } from '@/components/MutationButton'
import { Random } from '@/services/utils/Random'
import { sxes } from '@/services/utils/sxes'
import { Alert, Box, BoxProps, Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, PaperOwnProps, PaperProps, SxProps, Theme, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FormEvent, FunctionComponent, PropsWithChildren, createContext, useRef, useState } from 'react'

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

export type KeyType = (string | number) | (string | number)[]

export type FormContextData = {
  data: DataState
  getValid: (key: KeyType) => boolean
  getValue: (key: KeyType) => any
  setValue: (key: KeyType, value: any, invalid?: boolean) => void
}

export const FormContext = createContext<FormContextData>({
  data: EmptyDataSate,
  getValid: () => true,
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

export async function tryResponse<T>(fn: () => T | Promise<T>): Promise<FormResponse<T>> {
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
  open?: boolean
  onChange?: (data: { [key: string]: any }, invalid: InvalidityTree | undefined) => void
  onClose?: () => void
  onSuccess?: () => void
  redirectOnSuccess?: (data: { [key: string]: any }, json: { [key: string]: any }) => string | undefined
  keepDataOnSuccess?: boolean
  loading?: boolean
  requireAuth?: boolean
  authMessage?: string
  title?: string
  initialData?: DataState
  submit?: (data: { [key: string]: any }) => Promise<FormResponse>
  errorMapper?: ErrorMapper
  errorTimeout?: number
  submitText?: string
  variant?: 'dialog' | 'paper' | 'box'
  nested?: boolean
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

function seek(key: KeyType, target: any): any {
  if (!target) {
    return undefined
  } else if (Array.isArray(key)) {
    const head = key[0]
    const tail = key.slice(1)
    if (tail.length === 0) {
      return target[head]
    } else {
      return seek(tail, target[head])
    }
  } else {
    return target[key]
  }
}

function spread(key: string | number, target: any, value: any): any {
  if (typeof key === 'string') {
    return { ...target, [key]: value }
  } else {
    const next = Array.isArray(target) ? [ ...target ] : []
    next[key] = value
    return next
  }
}

function merge(key: KeyType, value: any, target: any): any {
  if (Array.isArray(key)) {
    const head = key[0]
    const tail = key.slice(1)
    if (tail.length === 0) {
      return spread(head, target, value)
    } else {
      return spread(head, target, merge(tail, value, target[head]))
    }
  } else if (typeof key === 'string') {
    return spread(key, target, value)
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

export const Form: FunctionComponent<PropsWithChildren<FormProps>> =
  (props) => {
    const router = useRouter()
    const [ error, setError ] = useState<ErrorOutput | undefined>(undefined)
    const [ x, setX ] = useState<number>(0)
    const data = useRef<DataState>(props.initialData || EmptyDataSate)

    const ctx: FormContextData = {
      data: data.current,
      getValid: (key: KeyType) => !seek(key, data.current.invalid),
      getValue: (key: KeyType) => seek(key, data.current.state),
      setValue: (key: KeyType, value: any, invalid?: boolean) => {
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
      if (disabled || props.loading || !props.submit) { return }
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

    function onSubmit(e: FormEvent<any>): void {
      save()
      e.preventDefault()
      e.stopPropagation()
    }

    const component = props.nested ? undefined : 'form'
    
    if (props.variant === 'dialog' || typeof props.variant === 'undefined') {
      return (
        <FormContext.Provider value={ctx}>
          <Dialog open={!!props.open} onClose={props.onClose} component={component} onSubmit={onSubmit}>
            { props.title && <DialogTitle>{props.title}</DialogTitle> }
            <DialogContent>
              { props.children }
              { error && <Alert severity={error.severity}>{error.message}</Alert> }
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0 }}>
              <Button variant="contained" color={props.destructive ? 'inherit' : 'error'} onClick={() => props.onClose?.()}>Cancel</Button>
              <Box flex="1"/>

              { props.submit &&
                <MutationButton
                  color={props.destructive ? 'error' : 'primary'}
                  submit={save}
                  disabled={disabled}
                >
                  { props.submitText || 'Submit' }
                </MutationButton>
              }
            </DialogActions>
          </Dialog>
        </FormContext.Provider>
      )
    } else {
      return (
        <FormContext.Provider value={ctx}>
          <Container component={component} sx={props.sx} onSubmit={onSubmit} variant={props.variant} >
            { props.title && <Typography variant="h4" sx={{ mb: 2 }}>{props.title}</Typography> }
            { props.children }
            { error && <Alert severity={error.severity}>{error.message}</Alert> }
            
            { props.submit &&
              <Box textAlign="right" sx={{ mt: 1 }}>
                <MutationButton
                  color={props.destructive ? 'error' : 'primary'}
                  submit={save}
                  disabled={disabled}
                >
                  { props.submitText || 'Submit' }
                </MutationButton>
              </Box>
            }
          </Container>
        </FormContext.Provider>
      )
    }
  }

type ContainerProps = {
  component?: string
  sx?: SxProps<Theme>
  onSubmit: (e: FormEvent<any>) => void
  variant: 'paper' | 'box'
}

const Container: FunctionComponent<ContainerProps> =
  ({ sx, variant, ...rest }) =>
    (variant === 'paper')
      ? <Paper {...rest} sx={sxes([{ p: 2 }, sx])} />
      : <Box {...rest as any} sx={sx} />
