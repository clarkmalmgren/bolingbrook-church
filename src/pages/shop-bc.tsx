import { FunctionComponent, useEffect, useState } from 'react'

const baseUrl = 'https://app.printyourcause.com'
const url = `${baseUrl}/campaign/bolingbrookchurch`

export const ShopBC: FunctionComponent<{}> =
  () => {
    const [ height, setHeight ] = useState('500px')

    const handleIframeMessage = (e: MessageEvent) => {
      if (e.origin.startsWith(baseUrl) && e.data && e.data.length >= 2) {
        switch (e.data[0] as string) {
          case "setIframeHeight":
            setHeight(e.data[1])
            break

          case "iframeScrollUp":
            window.scrollTo(0, e.data[1])
            break
        }
      }
    }

    useEffect(() => {
      window.addEventListener('message', handleIframeMessage)
      return () => window.removeEventListener('message', handleIframeMessage)
    }, [])

    return (
      <iframe title="Shop Bolingbrook" src={url} frameBorder="0" style={{height: height, width: '100%'}}></iframe>
    )
  }