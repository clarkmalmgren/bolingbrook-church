import { FunctionComponent } from 'react'
import { Link } from '../components/links'
import { useEntries } from '../services/contentful'

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
  ({ display }) => {
    // Get all links 
    const { data }  = useEntries<LinkData>({ content_type: 'link' })
    const links = data?.filter(l => l.display.includes(display))

    if (links?.length) {
      return (
        <>{
          links.map(l => (<Link key={l.text} link={l.link} icon={l.icon} socicon={l.iconType === 'socicon'}>{l.text}</Link>))
        }</>
      )
    } else {
      return null
    }
  }
