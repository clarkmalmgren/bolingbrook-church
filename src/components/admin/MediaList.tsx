'use client'

import { Form } from '@/forms/Form'
import { TextFormField } from '@/forms/FormField'
import { FormPhoto, FormVideo } from '@/forms/FormUpload'
import { MediaRef, uploadMedia, useAllMedia } from '@/services/MediaService'
import { Random } from '@/services/utils/Random'
import { Add } from '@mui/icons-material'
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent, useState } from 'react'
import { DeleteMedia } from './DeleteMedia'
import { MediaItem } from './MediaItem'
import { FormSwitch } from '@/forms/FormSwitch'

export const MediaList: FunctionComponent<{}> =
  () => {
    const media = useAllMedia()

    if (!media) {
      return (
        <Box height="80vh" width="100%" textAlign="center">
          <CircularProgress sx={{ position: 'absolute', top: '50%' }} />
        </Box>
      )
    }

    return (
      <Paper sx={{ m: 2, p: 2, flex: 1, minWidth: 350 }}>
        <Box position="relative" pb={2}>
          <Typography variant="h3">Media</Typography>
          <UploadMediaForm />
        </Box>
        <MediaTable all={media} showDelete />
      </Paper>
    )
  }

type MediaTableProps = {
  all: MediaRef[]
  onClick?: (m: MediaRef) => void
  showDelete?: boolean
}

export const MediaTable: FunctionComponent<MediaTableProps> =
  ({ all, onClick, showDelete }) => (
    <TableContainer>
      <Table >
        <TableBody>
          {all.map(m => (
            <TableRow key={m.id} hover onClick={() => onClick?.(m)}>
              <TableCell>
                <MediaItem media={m} />
              </TableCell>
              { showDelete && <TableCell width={1}><DeleteMedia media={m} /></TableCell> }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

const UploadMediaForm: FunctionComponent<{}> =
  () => {
    const [ open, setOpen ] = useState(false)
    const [ video, setVideo ] = useState(false)

    return (
      <>
        <Button
          color="success"
          variant="contained"
          sx={{ borderRadius: 300, position: 'absolute', right: 0, top: 0 }}
          LinkComponent={Link}
          onClick={() => setOpen(true)}
        >
          Add <Add />
        </Button>
        <Form
          open={open}
          onClose={() => setOpen(false)}
          title="Add New Media"
          onChange={(d) => { setVideo(d.video) }}
          submit={async (d) => { 
            const id = Random.string(10)
            setVideo(false)
            return uploadMedia(id, d.name, d.file)
          }}
          loading={false}
        >
          <TextFormField id="name" label="Name" required />
          <FormSwitch id="video" label="Is Video?" />
          { !video && <FormPhoto id="file" label="Upload Image" /> }
          {  video && <FormVideo id="file" label="Upload Video" /> }
        </Form>
      </>
    )
  }