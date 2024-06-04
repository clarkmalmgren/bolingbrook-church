'use client'

import { useSermonPage } from '@/services/SermonService'
import { Sermon, SermonPage } from '@/services/models/sermon'
import { Box, Divider, Pagination, Paper } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { SermonCard } from './SermonCard'

type Props = {
  onClick?: (sermon: Sermon) => void
  prefetch?: SermonPage
}


export const SermonList: FunctionComponent<Props> =
  ({ onClick, prefetch }) => {
    const [page, setPage] = useState(1)
    const { sermons, pageCount } = useSermonPage(page, prefetch)

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
        { sermons.map(s => (<SermonCard sermon={s} key={s.date} onClick={onClick} />)) }

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
