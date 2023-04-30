import { FunctionComponent, useEffect, useState, Fragment } from 'react'
import { Link } from '../components/links'
import { useContentfulClient, runQuery } from '../services/contentful'

type DisplayType = 'Side Bar' | 'About' | 'Get Involved' | 'Connect' | 'Listen'

type LinkData = {
  text: string,
  icon: string,
  iconType?: 'material' | 'socicon',
  link: string,
  display: DisplayType[]
}

interface Props {
  display: DisplayType
}

export const DynamicLinks: FunctionComponent<Props> =
  ({display}) => {
    // Data control to download and then filter the links that are applicable to this location
    const [links, setLinks] = useState(undefined as LinkData[] | undefined)
    const client = useContentfulClient()

    useEffect(() => {
      if (!links) {
        runQuery<LinkData>(client, {content_type: 'link'})
          .then(result => {
            const applicable = result.filter(l => l.display.includes(display))
            setLinks(applicable)
          })
      }
    })

    if (links?.length) {
      return (<Fragment>{
      links.map(l => (<Link key={l.text} link={l.link} icon={l.icon} socicon={l.iconType === 'socicon'}>{l.text}</Link>))
      }</Fragment>)
    } else {
      return null
    }

  }