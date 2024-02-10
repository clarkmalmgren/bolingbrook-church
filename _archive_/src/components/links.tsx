import { FunctionComponent, PropsWithChildren } from 'react'
import { Icon } from '@mui/material'
import { Button } from './button'
import { Socicon } from './socicon'

type LinkProps = {
  link: string
  icon: string
  socicon?: boolean
}

export const Link: FunctionComponent<PropsWithChildren<LinkProps>> =
  ({ link, icon, socicon, children }) => {
    function renderIcon() {
      return socicon ?
        (<Socicon sx={{ marginRight: '8px' }} name={icon}/>) :
        (<Icon sx={{ marginRight: '8px' }}>{icon}</Icon>)
    }

    return (
      <Button
        fullWidth={true}
        variant="text"
        align="left"
        link={link}
        sx={{
          margin: '3px 0 !important',
          color: 'black !important'
        }}
      >
        { renderIcon() }
        { children }
      </Button>
    )
  }

// Internal Links
export const Home         = () => (<Link link="/" icon="home">Home</Link>)
export const OurStory     = () => (<Link link='/about' icon='format_align_left'>Our Story</Link>)
export const GetConnected = () => (<Link link='/connect' icon='people'>Get Connected</Link>)
export const Sermons      = () => (<Link link='/sermons' icon='video_library'>Sermons</Link>)
export const Giving       = () => (<Link link='/giving' icon='attach_money'>Giving</Link>)
export const Location     = () => (<Link link='/location' icon='place'>Location</Link>)
export const Serve        = () => (<Link link='/join-a-team' icon='pan_tool'>Join a Team</Link>)
export const MeetUs       = () => (<Link link='/meet-us' icon='emoji_people'>Meet Us</Link>)
export const Newsletter   = () => (<Link link='/newsletter' icon='email'>Newsletter</Link>)
export const FriendsFam   = () => (<Link link='/friends-and-family' icon='group_add'>Friends &amp; Family</Link>)
export const ShopBC       = () => (<Link link='/shop-bc' icon='shopping_cart'>Shop BC</Link>)

// Podcasts
export const Podcast      = () => (<Link link='https://podcasts.bolingbrook.church' icon='headset'>Podcast</Link>)
export const ApplePodcast = () => (<Link link='https://podcasts.apple.com/us/podcast/bolingbrook-church/id1510682420' icon='apple' socicon>Apple Podcasts</Link>)
export const Spotify      = () => (<Link link='https://open.spotify.com/show/3s7jbC3zYO3PrF93VuqpO7' icon='spotify' socicon>Spotify</Link>)

// External Social Links
export const Twitter    = () => (<Link link='http://www.twitter.com/bolingbrooksda' icon='twitter' socicon>Twitter</Link>)
export const Instagram  = () => (<Link link='http://instagram.com/bolingbrookchurch' icon='instagram' socicon>Instagram</Link>)
export const Facebook   = () => (<Link link='https://www.facebook.com/bolingbrooksda' icon='facebook' socicon>Facebook</Link>)
export const Youtube    = () => (<Link link='https://www.youtube.com/bolingbrook-church' icon='youtube' socicon>Youtube</Link>)

// Admin Links
export const EditSermons = () => (<Link link="/admin/sermons" icon="library_add">Edit Sermons</Link>)
