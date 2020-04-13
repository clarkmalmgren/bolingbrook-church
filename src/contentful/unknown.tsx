import React, { FunctionComponent } from 'react'

interface UnknownProps {
  data: any
}

export const Unknown: FunctionComponent<UnknownProps> =
  ({data}) => {
    return (<pre key={data?.sys?.id}>{JSON.stringify(data, undefined, 2)}</pre>)
  }
