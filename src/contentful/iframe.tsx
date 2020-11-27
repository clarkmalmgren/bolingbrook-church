import { Entry } from 'contentful'
import React, { FunctionComponent } from 'react'

export interface IFrameData {
  name: string
  height: number,
  url: string
}

interface Props {
  entry: Entry<IFrameData>
}

export const IFrame: FunctionComponent<Props> =
  ({entry}) => {
    const styles = { width: '100%', height: `${entry.fields.height}px` }

    return (
      <iframe title={entry.fields.name} frameBorder="0" marginHeight={0} marginWidth={0} src={entry.fields.url} style={styles}/>
    )
  }
