import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { FunctionComponent } from 'react'
import { useSermon } from '@/services/SermonService'
import { Youtube }  from './Youtube'

type Props = { date: string }

export const SermonPlayback: FunctionComponent<Props> =
  ({ date }) => {
    const sermon = useSermon(date)

    return sermon ?
      (
        <Box display="flex" flexDirection="column" alignItems="center">
          { sermon.services.map((s, i) => <Youtube key={i} id={s.youtube} />) }
          <Box display="flex" flexWrap="wrap" p={2}>
            <Box>
              <Typography variant="h4">{sermon.title}</Typography>
              <Typography variant="h5">{sermon.speaker}</Typography>
            </Box>
            <Box flex="1" />
            <Box>
              <Typography variant="h5">{ moment(sermon.date).format("MMMM D, YYYY") }</Typography>
            </Box>
            <Box flex="100%" height="0" />
            <Typography>{sermon.description}</Typography>
          </Box>
        </Box>
      ) : (
        <Box>
          <Typography variant="h2">Loading...</Typography>
        </Box>
      )
  }
