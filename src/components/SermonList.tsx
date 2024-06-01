'use client'

import { Box, Divider, Pagination, Paper } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { SermonCard } from './SermonCard'
import { useSermons } from '@/services/SermonService'
import { Sermon, SermonMap } from '@/services/models/sermon'

type Props = {
  onClick?: (sermon: Sermon) => void
  prefetch?: SermonMap
}

const PAGE_SIZE = 12

export const SermonList: FunctionComponent<Props> =
  ({ onClick, prefetch }) => {
    const sermons = useSermons(prefetch) || []
    const [page, setPage] = useState(1)

    const pageCount = sermons ? Math.ceil(sermons.length / PAGE_SIZE) : 0
    const start = (page - 1) * PAGE_SIZE
    const visibleSermons = (sermons || []).slice(start, start + PAGE_SIZE)

    const selectPage = (event: React.ChangeEvent<unknown>, value: number) => {
      setPage(value)
    }

    return (
      <Paper
        sx={{
          display: 'flex',
          flexFlow: 'row wrap',
          justifyContent: 'center',
          alignSelf: 'center',
          ml: 'auto',
          mr: 'auto',
          maxWidth: 1550
        }}
      >
        { visibleSermons.map(s => (<SermonCard sermon={s} key={s.date} onClick={onClick} />)) }

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
    )
  }
