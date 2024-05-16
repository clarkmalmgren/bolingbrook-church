import { FunctionComponent } from 'react'

export type IframeProps = {
  height: number
  url?: string
  data?: string
}

export const IFrame: FunctionComponent<IframeProps> =
  ({ height, url, data }) => (
    <iframe
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      src={url || ('data:text/html;base64,' + data)}
      style={{ width: '100%', height: `${height}px` }}
    />
  )
