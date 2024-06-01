import { FunctionComponent, ReactNode } from 'react'

export type ServerComponent<P = {}> = FunctionComponent<P> & {
  (props: P, context?: any): Promise<ReactNode>
}
