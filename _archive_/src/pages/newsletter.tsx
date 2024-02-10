import { FunctionComponent } from 'react'

export const Newsletter: FunctionComponent<{}> =
  () => (
    <iframe
      title="Newsletter"
      src={'https://church.us7.list-manage.com/subscribe?u=47fbf7f20e7641d78489b6636&id=9b074a79c5'}
      frameBorder="0"
      style={{ height: '900px', width: '100%' }}
    />
  )
