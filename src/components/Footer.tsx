import { Box, Button, Typography, Paper } from '@mui/material'
import { FunctionComponent, PropsWithChildren } from 'react'
import * as Links from './MenuLink'
const { version: appVersion } = require('../../package.json')

const LinkGroup: FunctionComponent<PropsWithChildren<{header: string}>> =
  ({ header, children }) => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '250px'
    }}>
      <Typography sx={{ padding: '4px 30px' }} variant="h5">{header}</Typography>
      {children}
    </Box>
  )

export const Footer: FunctionComponent<{}> =
  () => {

    return (
      <Paper sx={{ position: 'relative', marginTop: '40px' }}>
        <Box sx={{
          padding: '20px',
          display: 'flex',
          flexFlow: 'wrap',
          justifyContent: 'center',
          backgroundColor: 'grey.200'
        }}>
          <LinkGroup header="About">
            <Links.OurStory />
            <Links.MeetUs />
            <Links.Location />
            <Links.Sermons />
            <Links.FriendsFam />
          </LinkGroup>

          <LinkGroup header="Get Involved">
            <Links.Giving />
            <Links.GetConnected />
            <Links.Newsletter />
            <Links.Serve />
            <Links.ShopBC />
          </LinkGroup>

          <LinkGroup header="Connect">
            <Links.Twitter />
            <Links.Instagram />
            <Links.Facebook />
            <Links.Youtube />
          </LinkGroup>

          <LinkGroup header="Listen">
            <Links.Podcast />
            <Links.ApplePodcast />
            <Links.Spotify />
          </LinkGroup>
        </Box>

        <Box sx={{ padding: '10px 10px', textAlign: 'center' }}>
          <Typography color="inherit" variant="body1">301 E Boughton Rd, Bolingbrook IL, 60440</Typography>
          <Button color="inherit" variant="text" href="tel:630.739.1038">630.739.1038</Button>
          <Typography color="inherit" variant="body1">&copy; Bolingbrook Church 2017</Typography>
        </Box>

        <Typography sx={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          margin: '5px',
          fontSize: '.7em'
        }}>v{appVersion}-{process.env.NEXT_PUBLIC_ENV}</Typography>
      </Paper>
    )
  }
