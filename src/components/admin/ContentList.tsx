'use client'

import { DeleteContent } from '@/components/admin/DeleteContent'
import { DropdownAvailableTypes, TypeToName } from '@/components/admin/EditorTypeFields'
import { Form } from '@/forms/Form'
import { FormSelect } from '@/forms/FormSelect'
import { saveContent, useAllContent } from '@/services/ContentService'
import { Random } from '@/services/utils/Random'
import { Add } from '@mui/icons-material'
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useState } from 'react'

export const ContentList: FunctionComponent<{}> =
  () => {
    const content = useAllContent()
    const router = useRouter()
    const [ open, setOpen ] = useState(false)

    if (!content) {
      return (
        <Box height="80vh" width="100%" textAlign="center">
          <CircularProgress sx={{ position: 'absolute', top: '50%' }} />
        </Box>
      )
    }

    return (
      <Paper sx={{ m: 2, p: 2, flex: 1, minWidth: 350 }}>
        <Box position="relative" pb={2}>
          <Typography variant="h3">Content</Typography>
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
                <TableCell width={120} ><b>Type</b></TableCell>
                <TableCell width={1} />
              </TableRow>
            </TableHead>
            <TableBody>
              {content.map(c => (
                <TableRow key={c.meta.id} hover role="link" onClick={ () => router.push(`/editor/${c.meta.id}`) } sx={{ cursor: 'pointer' }}>
                  <TableCell>{c.meta.name}</TableCell>
                  <TableCell>{TypeToName[c.meta.type]}</TableCell>
                  <TableCell>
                    <DeleteContent content={c} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Form
          open={open}
          onClose={() => setOpen(false)}
          title="Add New Content"
          submit={async (d) => { 
            const id = Random.string(10)
            return saveContent(id, {
              meta: { id, type: d.type, name: "" },
              data: {}
            })
          }}
          redirectOnSuccess={(data, json) => `/editor/${json.meta.id}`}
          loading={false}
        >
          <FormSelect id="type" label="Component Type" options={DropdownAvailableTypes} required />
        </Form>
      </Paper>
    )
  }

