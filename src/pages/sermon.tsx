import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { SermonList } from '../components/sermon-list'
import SermonPlayback from '../components/sermon-playback'
import { Typography } from '@mui/material';

export const Sermon: FunctionComponent<{}> =
  () => {
    const id = useParams().id as string

    return (
      <div>
        <SermonPlayback date={id} />
        <Typography variant="h1" align="center">More Sermons</Typography>
        <SermonList />
      </div>
    )
  }

