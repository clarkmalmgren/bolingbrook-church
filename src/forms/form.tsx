import { Brush } from '@mui/icons-material'
import { Badge, Paper } from '@mui/material'
import { cloneElement, isValidElement, PropsWithChildren, ReactElement, ReactNode, useRef, useState } from 'react'
import { DeepPartial, FieldValues, RegisterOptions, useForm, UseFormReturn } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { ErrorDialog } from '../components/error'

export type FormProps<T extends FieldValues> = {
  onSubmit: (data: T) => (Promise<any> | any | void)
  defaultValues?: DeepPartial<T>
  children?: ReactElement[]
  navOnSubmitted?: string
  showRenderCount?: boolean
}

export function renderChild<T extends FieldValues>(methods: UseFormReturn<T>, child: ReactNode, index: number) {
  if (isValidElement(child)) {
    const key = child.key || child.props.key || child.props.id || child.props.name || index
    const propsWithMethods = { methods, key, ...child.props }
    return cloneElement(child, propsWithMethods)
  }
}

export function Form<T extends FieldValues>(props: PropsWithChildren<FormProps<T>>): JSX.Element {
  const { onSubmit, children, defaultValues, navOnSubmitted, showRenderCount } = props
  const methods = useForm<T>({ defaultValues: defaultValues as any })
  const navigate = useNavigate()
  const [ failed, setFailed ] = useState(false)
  const renderCount = useRef(0)

  renderCount.current = renderCount.current + 1

  const doNav = () => navOnSubmitted && navigate(navOnSubmitted)

  const trySubmit = (data: T) => {
    try {
      const response = onSubmit(data)
      if (typeof response.then === 'function') {
        response.then(
          () => doNav(),
          () => setFailed(true)
        )
      } else {
        doNav()
      }
    } catch {
      setFailed(true)
    }
  }

  return (
    <>
      <Paper
        onSubmit={methods.handleSubmit(trySubmit)}
        sx={{
          position: 'relative',
          display: 'flex',
          flexFlow: 'row wrap',
          maxWidth: '800px',
          padding: '22px',
          margin: '15px auto'
        }}
        component="form"
      >
        { showRenderCount &&
          <Badge
            sx={{position: 'absolute', right: 16, top: 16 }}
            color="secondary"
            badgeContent={renderCount.current} max={99}
          >
            <Brush />
          </Badge>
        }
        { children?.map((c, i) => renderChild(methods, c, i)) }
      </Paper>

      <ErrorDialog open={failed} onClose={() => setFailed(false)} />
    </>
  )
}

export type FormElement<T> = T & { name: string, methods?: UseFormReturn, options?: RegisterOptions }