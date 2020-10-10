import React, { FunctionComponent, useEffect, useState } from 'react'
import { Link } from '../components/links'
import { query } from '../services/contentful'


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
    useEffect(() => {
      if (!links) {
        query<LinkData>({content_type: 'link'})
          .then(result => {
            const applicable = result.filter(l => l.display.includes(display))
            setLinks(applicable)
          })
      }
    })

    if (links?.length) {
      return (<div>{
      links.map(l => (<Link key={l.text} link={l.link} icon={l.icon} socicon={l.iconType === 'socicon'}>{l.text}</Link>))
      }</div>)
    } else {
      return null
    }

  }