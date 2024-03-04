import { Button, Icon } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent, PropsWithChildren } from 'react'
import { Socicon } from './Socicon'


type LinkProps = {
  link: string
  icon: string
  socicon?: boolean
}

export const MenuLink: FunctionComponent<PropsWithChildren<LinkProps>> =
  ({ link, icon, socicon, children }) => {

    return (
      <Button
        fullWidth={true}
        variant="text"
        LinkComponent={Link}
        href={link}
        sx={{
          margin: '3px 0 !important',
          color: 'black !important',
          textAlign: 'left',
          justifyContent: 'left'
        }}
      >
        { socicon ? <Socicon sx={{ marginRight: '8px' }} name={icon}/> : <Icon sx={{ marginRight: '8px' }}>{icon}</Icon> }
        { children }
      </Button>
    )
  }
// Internal Links
export const Home         = () => (<MenuLink link="/" icon="home">Home</MenuLink>)
export const OurStory     = () => (<MenuLink link='/about' icon='format_align_left'>Our Story</MenuLink>)
export const GetConnected = () => (<MenuLink link='/connect' icon='people'>Get Connected</MenuLink>)
export const Sermons      = () => (<MenuLink link='/sermons' icon='video_library'>Sermons</MenuLink>)
export const Giving       = () => (<MenuLink link='/giving' icon='attach_money'>Giving</MenuLink>)
export const Location     = () => (<MenuLink link='/location' icon='place'>Location</MenuLink>)
export const Serve        = () => (<MenuLink link='/join-a-team' icon='pan_tool'>Join a Team</MenuLink>)
export const MeetUs       = () => (<MenuLink link='/meet-us' icon='emoji_people'>Meet Us</MenuLink>)
export const Newsletter   = () => (<MenuLink link='/newsletter' icon='email'>Newsletter</MenuLink>)
export const FriendsFam   = () => (<MenuLink link='/friends-and-family' icon='group_add'>Friends &amp; Family</MenuLink>)
export const ShopBC       = () => (<MenuLink link='/shop-bc' icon='shopping_cart'>Shop BC</MenuLink>)

// Podcasts
export const Podcast      = () => (<MenuLink link='https://podcasts.bolingbrook.church' icon='headset'>Podcast</MenuLink>)
export const ApplePodcast = () => (<MenuLink link='https://podcasts.apple.com/us/podcast/bolingbrook-church/id1510682420' icon='apple' socicon>Apple Podcasts</MenuLink>)
export const Spotify      = () => (<MenuLink link='https://open.spotify.com/show/3s7jbC3zYO3PrF93VuqpO7' icon='spotify' socicon>Spotify</MenuLink>)

// External Social Links
export const Twitter    = () => (<MenuLink link='http://www.twitter.com/bolingbrooksda' icon='twitter' socicon>Twitter</MenuLink>)
export const Instagram  = () => (<MenuLink link='http://instagram.com/bolingbrookchurch' icon='instagram' socicon>Instagram</MenuLink>)
export const Facebook   = () => (<MenuLink link='https://www.facebook.com/bolingbrooksda' icon='facebook' socicon>Facebook</MenuLink>)
export const Youtube    = () => (<MenuLink link='https://www.youtube.com/bolingbrook-church' icon='youtube' socicon>Youtube</MenuLink>)

// Admin Links
export const EditSermons = () => (<MenuLink link="/admin/sermons" icon="library_add">Edit Sermons</MenuLink>)