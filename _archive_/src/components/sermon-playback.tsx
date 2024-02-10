import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { FunctionComponent } from 'react'
import { useSermon } from '../services/sermon'
import { BCBox } from './box'
import { Youtube }  from './youtube'

type Props = { date: string }

export const SermonPlayback: FunctionComponent<Props> =
  ({ date }) => {
    const sermon = useSermon(date).value

    return sermon ?
      (
        <BCBox>
          { sermon.services.map(s => <Youtube key={s.youtube} id={s.youtube} />) }
          <Box display="flex">
            <BCBox>
              <Typography variant="h4">{sermon.title}</Typography>
              <Typography variant="h5">{sermon.speaker}</Typography>
            </BCBox>
            <BCBox>
              <Typography variant="h5">{ moment(sermon.date).format("MMMM D, YYYY") }</Typography>
            </BCBox>
          </Box>
          <Typography>{sermon.description}</Typography>
        </BCBox>
      ) : (
        <BCBox>
          <Typography variant="h2">Loading...</Typography>
        </BCBox>
      )
  }
