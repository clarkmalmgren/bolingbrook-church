import * as React from 'react'
import { createStyles, withStyles } from '@material-ui/styles'
import { Theme, Icon, Typography } from '@material-ui/core'
import Button from './button'
import grey from '@material-ui/core/colors/grey'
import * as Links from './links'

const { version: appVersion } = require('../../package.json')

interface FooterProps {
  classes?: any
}

const styles = (theme: Theme) => createStyles({
  root: {
    position: 'relative',
    marginTop: '20px',
    background: grey[100]
  },

  notice: {
    padding: '10px 20px',
    background: theme.palette.primary.dark,
    color: 'white',
    fontSize: '14px'
  },

  links: {
    margin: '20px',
    display: 'flex',
    flexFlow: 'wrap',
    justifyContent: 'center',

    '& .link-group': {
      display: 'flex',
      flexDirection: 'column',
      width: '250px',

      '& .header': { padding: '4px 30px' }
    }
  },

  contact: {
    padding: '10px 10px',
    background: theme.palette.primary.dark,
    color: 'white',
    textAlign: 'center'
  },

  version: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    margin: '5px'
  }

})

class Footer extends React.PureComponent<FooterProps, {}> {
  render() {
    return (
      <div className={this.props.classes.root}>
        <div className={this.props.classes.notice}>
          <Typography color="inherit">
            Our live streams begins at 10:30am &amp; 12:30pm Central Time on Saturdays.
          </Typography>
        </div>

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
        </div>

        <div className={this.props.classes.contact}>
          <Typography color="inherit" variant="body1"><Icon>pin_drop</Icon> 301 E Boughton Rd, Bolingbrook IL, 60440</Typography>
          <Button color="inherit" variant="text" link="tel:630.739.1038"><Icon>local_phone</Icon> 630.739.1038</Button>
          <Typography color="inherit" variant="body1">&copy; Bolingbrook Church 2017</Typography>
        </div>

        <Typography className={this.props.classes.version}>v{appVersion}</Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Footer)
