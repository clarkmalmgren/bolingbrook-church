'use client'

import { DeleteContent } from '@/components/admin/DeleteContent'
import { DropdownAvailableTypes, TypeToName } from '@/components/admin/EditorTypeFields'
import { Form } from '@/forms/Form'
import { TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { FormPhoto } from '@/forms/FormUpload'
import { uploadMedia, useAllMedia } from '@/services/MediaService'
import { Random } from '@/services/utils/Random'
import { Add } from '@mui/icons-material'
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import { DeleteMedia } from './DeleteMedia'
import { MediaItem } from './MediaItem'

export const MediaList: FunctionComponent<{}> =
  () => {
    const media = useAllMedia()
    const [ open, setOpen ] = useState(false)

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
          <Button
            color="success"
            variant="contained"
            sx={{ borderRadius: 300, position: 'absolute', right: 0, top: 0 }}
            LinkComponent={Link}
            onClick={() => setOpen(true)}
          >
            Add <Add />
          </Button>
        </Box>
        <TableContainer>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell><b>Name</b></TableCell>
                <TableCell width={1} />
              </TableRow>
            </TableHead>
            <TableBody>
              {media.map(m => (
                <TableRow key={m.id} hover >
                  <TableCell>
                    <MediaItem media={m} />
                  </TableCell>
                  <TableCell>
                    <DeleteMedia media={m} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Form
          open={open}
          onClose={() => setOpen(false)}
          title="Add New Media"
          submit={async (d) => { 
            const id = Random.string(10)
            return uploadMedia(id, d.name, d.file)
          }}
          loading={false}
        >
          <TextFormField id="name" label="Name" required />
          <FormPhoto id="file" label="Upload Media" />
        </Form>
      </Paper>
    )
  }

