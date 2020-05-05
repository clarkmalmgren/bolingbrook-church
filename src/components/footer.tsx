import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { Theme, Typography } from '@material-ui/core'
import Button from './button'
import * as Links from './links'

const { version: appVersion } = require('../../package.json')

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
    marginTop: '40px',
    // background: grey[200]
  },

  links: {
    padding: '20px',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center',

    borderTop: `3px solid ${theme.palette.primary.dark}`,
    borderBottom: `3px solid ${theme.palette.primary.dark}`,

    '& .link-group': {
      display: 'flex',
      flexDirection: 'column',
      width: '250px',

      '& .header': { padding: '4px 30px' }
    }
  },

  contact: {
    padding: '10px 10px',
    textAlign: 'center',
    borderBottom: `3px solid ${theme.palette.primary.dark}`
  },

  version: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    margin: '5px',
    fontSize: '.7em'
  }

})

interface FooterProps extends WithStyles<typeof styles> {
}

class Footer extends React.PureComponent<FooterProps, {}> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.links}>
          <div className="link-group">
            <Typography className="header" variant="h4">About</Typography>

            <Links.OurStory />
            <Links.MeetUs />
            <Links.Location />
            <Links.Sermons />
            <Links.FriendsFam />
          </div>

          <div className="link-group">
            <Typography className="header" variant="h4">Get Involved</Typography>

            <Links.Giving />
            <Links.GetConnected />
            <Links.Newsletter />
            <Links.Serve />
            <Links.ShopBC />
          </div>

          <div className="link-group">
            <Typography className="header" variant="h4">Connect</Typography>

            <Links.Twitter />
            <Links.Instagram />
            <Links.Facebook />
            <Links.Youtube />
          </div>

          <div className="link-group">
            <Typography className="header" variant="h4">Listen</Typography>

            <Links.Podcast />
            <Links.ApplePodcast />
            <Links.Spotify />
          </div>
        </div>

        <div className={this.props.classes.contact}>
          <Typography color="inherit" variant="body1">301 E Boughton Rd, Bolingbrook IL, 60440</Typography>
          <Button color="inherit" variant="text" link="tel:630.739.1038">630.739.1038</Button>
          <Typography color="inherit" variant="body1">&copy; Bolingbrook Church 2017</Typography>
        </div>

        <Typography className={this.props.classes.version}>v{appVersion}</Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Footer)
