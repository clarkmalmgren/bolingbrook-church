import * as React from 'react'
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import { Theme, Typography, Paper } from '@material-ui/core'
import Button from './button'
import * as Links from './links'
import { DynamicLinks } from '../contentful/dynamic-links'

const { version: appVersion } = require('../../package.json')

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
    marginTop: '40px'
  },

  links: {
    padding: '20px',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center',

    backgroundColor: theme.palette.grey[200],

    '& .link-group': {
      display: 'flex',
      flexDirection: 'column',
      width: '250px',

      '& .header': { padding: '4px 30px' }
    }
  },

  contact: {
    padding: '10px 10px',
    textAlign: 'center'
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
      <Paper className={this.props.classes.root}>
        <div className={this.props.classes.links}>
          <div className="link-group">
            <Typography className="header" variant="h4">About</Typography>

            <Links.OurStory />
            <Links.MeetUs />
            <Links.Location />
            <Links.Sermons />
            <Links.FriendsFam />
            <DynamicLinks display="About" />
          </div>

          <div className="link-group">
            <Typography className="header" variant="h4">Get Involved</Typography>

            <Links.Giving />
            <Links.GetConnected />
            <Links.Newsletter />
            <Links.Serve />
            <Links.ShopBC />
            <DynamicLinks display="Get Involved" />
          </div>

          <div className="link-group">
            <Typography className="header" variant="h4">Connect</Typography>

            <Links.Twitter />
            <Links.Instagram />
            <Links.Facebook />
            <Links.Youtube />
            <DynamicLinks display="Connect" />
          </div>

          <div className="link-group">
            <Typography className="header" variant="h4">Listen</Typography>

            <Links.Podcast />
            <Links.ApplePodcast />
            <Links.Spotify />
            <DynamicLinks display="Listen" />
          </div>
        </div>

        <div className={this.props.classes.contact}>
          <Typography color="inherit" variant="body1">301 E Boughton Rd, Bolingbrook IL, 60440</Typography>
          <Button color="inherit" variant="text" link="tel:630.739.1038">630.739.1038</Button>
          <Typography color="inherit" variant="body1">&copy; Bolingbrook Church 2017</Typography>
        </div>

        <Typography className={this.props.classes.version}>v{appVersion}-{process.env.REACT_APP_ENV}</Typography>
      </Paper>
    )
  }
}

export default withStyles(styles)(Footer)
