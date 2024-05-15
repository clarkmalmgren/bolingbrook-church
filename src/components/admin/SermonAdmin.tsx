'use client'

import { Sermon } from '@/services/models/sermon'
import { Add } from '@mui/icons-material'
import { Box, Button, Paper, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { SermonList } from '../SermonList'
import { SermonEditor } from './SermonEditor'

export const SermonAdmin: FunctionComponent<{}> =
  () => {
    const [ initial, setInitial ] = useState<Sermon>()
    const [ open, setOpen ] = useState(false)

    return (
      <Paper sx={{ p: 2, m: 2 }}>
        <Box display="flex" pb={2} >
          <Typography variant="h3" display="inline-block">Sermons</Typography>
          <Box flex="1"/>
          <Button
            color="success"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Add <Add />
          </Button>
        </Box>
        <SermonList onClick={ (s) => { setOpen(true); setInitial(s) } } />
        { open && <SermonEditor initial={initial} onClose={() => { setOpen(false); setInitial(undefined) }} /> }
      </Paper>
    )
  }
