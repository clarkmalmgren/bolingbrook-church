import { FunctionComponent, PropsWithChildren } from 'react'
import { Box, Typography, Paper, useTheme } from '@mui/material'
import { Button } from './button'
import * as Links from './links'
import { DynamicLinks } from '../contentful/dynamic-links'

const { version: appVersion } = require('../../package.json')

const LinkGroup: FunctionComponent<PropsWithChildren<{header: string}>> =
  ({ header, children }) => (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '250px'
    }}>
      <Typography sx={{ padding: '4px 30px' }} variant="h4">{header}</Typography>
      {children}
    </Box>
  )

export const Footer: FunctionComponent<{}> =
  () => {
    const theme = useTheme()

    return (
      <Paper sx={{ position: 'relative', marginTop: '40px' }}>
        <Box sx={{
          padding: '20px',
          display: 'flex',
          flexFlow: 'wrap',
          justifyContent: 'center',
          backgroundColor: theme.palette.grey[200]
        }}>
          <LinkGroup header="About">
            <Links.OurStory />
            <Links.MeetUs />
            <Links.Location />
            <Links.Sermons />
            <Links.FriendsFam />
            <DynamicLinks display="About" />
          </LinkGroup>

          <LinkGroup header="Get Involved">
            <Links.Giving />
            <Links.GetConnected />
            <Links.Newsletter />
            <Links.Serve />
            <Links.ShopBC />
            <DynamicLinks display="Get Involved" />
          </LinkGroup>

          <LinkGroup header="Connect">
            <Links.Twitter />
            <Links.Instagram />
            <Links.Facebook />
            <Links.Youtube />
            <DynamicLinks display="Connect" />
          </LinkGroup>

          <LinkGroup header="Listen">
            <Links.Podcast />
            <Links.ApplePodcast />
            <Links.Spotify />
            <DynamicLinks display="Listen" />
          </LinkGroup>
        </Box>

        <Box sx={{ padding: '10px 10px', textAlign: 'center' }}>
          <Typography color="inherit" variant="body1">301 E Boughton Rd, Bolingbrook IL, 60440</Typography>
          <Button color="inherit" variant="text" link="tel:630.739.1038">630.739.1038</Button>
          <Typography color="inherit" variant="body1">&copy; Bolingbrook Church 2017</Typography>
        </Box>

        <Typography sx={{
          position: 'absolute',
          bottom: '0',
          right: '0',
          margin: '5px',
          fontSize: '.7em'
        }}>v{appVersion}-{process.env.REACT_APP_ENV}</Typography>
      </Paper>
    )
  }
