import { Entry } from 'contentful'
import { FunctionComponent } from 'react'

export interface IFrameData {
  name: string
  height: number
  url?: string
  data?: string
}

interface Props {
  entry: Entry<IFrameData>
}

export const IFrame: FunctionComponent<Props> =
  ({entry}) => {
    const styles = { width: '100%', height: `${entry.fields.height}px` }
    const src = entry.fields.url || ('data:text/html;base64,' + entry.fields.data)

    return (
      <iframe title={entry.fields.name} frameBorder="0" marginHeight={0} marginWidth={0} src={src} style={styles}/>
    )
  }
