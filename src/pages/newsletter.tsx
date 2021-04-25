import { FunctionComponent } from 'react'

const url = 'https://church.us7.list-manage.com/subscribe?u=47fbf7f20e7641d78489b6636&id=9b074a79c5'

const style = {
  height: '900px',
  width: '100%'
}

const Newsleter: FunctionComponent<{}> =
  () => (<iframe title="Newsletter" src={url} frameBorder="0" style={style}></iframe>)

export default Newsleter
