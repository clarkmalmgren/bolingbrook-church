'use client'

import { DropdownAvailableTypes } from '@/components/admin/EditorTypeFields'
import { Form } from '@/forms/Form'
import { FormSelect } from '@/forms/FormSelect'
import { saveContent, useAllContent } from '@/services/ContentService'
import { Random } from '@/services/utils/Random'
import { Add } from '@mui/icons-material'
import { Box, Button, CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FunctionComponent, useState } from 'react'

export const EditorListPage: FunctionComponent<{}> =
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
      <>
        <Paper sx={{ m: 2 }}>
          <TableContainer>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Content Type</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {content.map(c => (
                  <TableRow key={c.id} hover role="link" onClick={ () => router.push(`/editor/${c.id}`) } sx={{ cursor: 'pointer' }}>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.type}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Button
          color="success"
          variant="contained"
          size="large"
          sx={{
            position: 'fixed',
            right: (t) => t.spacing(2),
            bottom: (t) => t.spacing(2),
            borderRadius: 300
          }}
          LinkComponent={Link}
          onClick={() => setOpen(true)}
        >
          Add <Add />
        </Button>
        <Form
          open={open}
          onClose={() => setOpen(false)}
          title="Add New Content"
          submit={async (d) => { 
            const id = Random.string(10)
            return saveContent(id, { id, type: d.type, name: "" })
          }}
          redirectOnSuccess={(data, json) => `/editor/${json.id}`}
          loading={false}
        >
          <FormSelect id="type" label="Component Type" options={DropdownAvailableTypes} required />
        </Form>
      </>
    )
  }

export default EditorListPage
