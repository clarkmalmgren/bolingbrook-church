import { Sermon } from '@/services/models/sermon'
import { Box, Typography } from '@mui/material'
import moment from 'moment'
import { FunctionComponent } from 'react'
import { Loading } from './Loading'
import { Youtube } from './Youtube'

type Props = {
  sermon?: Sermon
}

export const SermonPlayback: FunctionComponent<Props> =
  ({ sermon }) => {
    if (sermon) {
      return (
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
      )
    } else {
      return <Loading />
    }
  }
