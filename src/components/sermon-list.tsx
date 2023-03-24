import { Box, Divider, Pagination, Paper } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { SermonCard } from '../components/sermon-card'
import { useSermons } from '../services/sermon'
import { BCBox } from './box'

type Props = {
  linkRoot?: string
}

const PAGE_SIZE = 9

export const SermonList: FunctionComponent<Props> =
  ({ linkRoot }) => {
    const sermons = useSermons().value || []
    const [page, setPage] = useState(1)

    const pageCount = sermons ? Math.ceil(sermons.length / PAGE_SIZE) : 0
    const start = (page - 1) * PAGE_SIZE
    const visibleSermons = (sermons || []).slice(start, start + PAGE_SIZE)

    const selectPage = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value)
    }

    return (
      <BCBox variant="wide-section">
        <Paper
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            justifyContent: 'center'
          }}
        >
          { visibleSermons.map(s => (<SermonCard sermon={s} key={s.date} linkRoot={linkRoot || '/sermons'}/>)) }

          <Divider sx={{ flex: '100%' }} />
          <Box sx={{ flex: '1 1', minWidth: '1px' }} />
          <Pagination
            sx={{
              flex: '0 auto',
              margin: '10px',
              alignSelf: 'center'
            }}
            count={pageCount}
            page={page}
            onChange={selectPage}
          />
        </Paper>
      </BCBox>
    )
  }
