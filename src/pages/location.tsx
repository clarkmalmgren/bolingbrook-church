import React, { PureComponent } from 'react'
import { Typography } from '@material-ui/core';
import { createStyles, withStyles, WithStyles } from '@material-ui/styles'
import Box from '../components/box'

const placeId = 'place_id:ChIJRcmvHlBaDogRL4gzWu1p8Ag'
const href = `https://www.google.com/maps/embed/v1/place?q=${placeId}&key=${process.env.REACT_APP_MAPS_API_KEY}`

const styles = createStyles({
  address: {
    whiteSpace: 'pre'
  },

  map: {
    width: '100%',
    height: '500px'
  }
})

class Location extends PureComponent<WithStyles<typeof styles>, {}> {

  render() {
    return (
      <div>
        <Box>
          <Typography variant="h2">Location</Typography>

          <Typography className={this.props.classes.address}>{
`We are located at:
  301 E Boughton Rd,
  Bolingbrook, IL 60440`
          }</Typography>
        </Box>
      
        <iframe title="Google Maps" frameBorder="0" allowFullScreen src={href} className={this.props.classes.map} />
      </div>
    )
  }
}

export default withStyles(styles)(Location)
