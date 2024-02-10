import { FunctionComponent } from 'react'
import { UseFormReturn } from 'react-hook-form'

type WatchProps = { methods?: UseFormReturn }

export const Watch: FunctionComponent<WatchProps> =
  ({ methods }) => {
    if (!methods) { throw new Error("Only use Watch as a direct child of Form") }
    return (
      <pre>{ JSON.stringify(methods.watch(), undefined, 2) }</pre>
    )
  }
