import { FunctionComponent } from 'react'

type UnknownProps = {
  data: any
}

export const Unknown: FunctionComponent<UnknownProps> =
  ({data}) => (<pre key={data?.sys?.id}>{JSON.stringify(data, undefined, 2)}</pre>)
