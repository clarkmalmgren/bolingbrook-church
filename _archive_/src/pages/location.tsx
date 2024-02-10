import { FunctionComponent } from 'react'
import { Typography } from '@mui/material'
import { BCBox } from '../components/box'

const placeId = 'place_id:ChIJRcmvHlBaDogRL4gzWu1p8Ag'
const href = `https://www.google.com/maps/embed/v1/place?q=${placeId}&key=${process.env.REACT_APP_MAPS_API_KEY}`

export const Location: FunctionComponent<{}> =
  () => (
    <div>
      <BCBox>
        <Typography variant="h2">Location</Typography>

        <Typography sx={{whiteSpace: 'pre'}}>{
`We are located at:
301 E Boughton Rd,
Bolingbrook, IL 60440`
        }</Typography>
      </BCBox>
    
      <iframe
        title="Google Maps"
        frameBorder="0"
        allowFullScreen
        src={href}
        style={{width: '100%', height: '500px'}}
      />
    </div>
  )
