import { FunctionComponent } from 'react'
import { Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles'
import { Box } from '../components/box'

const placeId = 'place_id:ChIJRcmvHlBaDogRL4gzWu1p8Ag'
const href = `https://www.google.com/maps/embed/v1/place?q=${placeId}&key=${process.env.REACT_APP_MAPS_API_KEY}`

const useStyles = makeStyles(() => createStyles({
  address: {
    whiteSpace: 'pre'
  },

  map: {
    width: '100%',
    height: '500px'
  }
}))

export const Location: FunctionComponent<{}> =
  () => {
    const classes = useStyles()
    return (
      <div>
        <Box>
          <Typography variant="h2">Location</Typography>

          <Typography className={classes.address}>{
`We are located at:
  301 E Boughton Rd,
  Bolingbrook, IL 60440`
          }</Typography>
        </Box>
      
        <iframe title="Google Maps" frameBorder="0" allowFullScreen src={href} className={classes.map} />
      </div>
    )
  }
