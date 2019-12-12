import * as React from 'react'
import Page from '../components/page'

const baseUrl = 'https://app.printyourcause.com'
const url = `${baseUrl}/campaign/bolingbrookchurch`

const style = {
  width: '100%'
}

interface MerchandiseState {
  height: string
}

export default class ShopBC extends React.PureComponent<{}, MerchandiseState> {

  state = { height: '500px' }

  render() {
    return (
      <Page>
        <iframe src={url} frameBorder="0" style={{height: this.state.height, ...style}}></iframe>
      </Page>
    )
  }

  handleIframeMessage(e: MessageEvent) {
    if (e.origin.startsWith(baseUrl) && e.data && e.data.length >= 2) {
      switch (e.data[0] as string) {
        case "setIframeHeight":
          this.setState({ height: e.data[1] })
          break

        case "iframeScrollUp":
          window.scrollTo(0, e.data[1])
          break
      }
    }
  }

  boundHandler = this.handleIframeMessage.bind(this)

  componentDidMount() {
    window.addEventListener('message', this.boundHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.boundHandler)
  }


}