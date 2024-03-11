'use client'

import { DynamicComponent } from '@/components/DynamicComponent'
import { DropdownAvailableTypes, TypeSpecificFields, TypeToName } from '@/components/admin/EditorTypeFields'
import { DataState, Form } from '@/forms/Form'
import { TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { Content, saveContent, useContent } from '@/services/ContentService'
import { ChevronLeft } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent, useEffect, useState } from 'react'

type EditorPageProps = {
  params: {
    id: string
  }
}

const EditorPage: FunctionComponent<EditorPageProps> =
  ({ params: { id } }) => {
    const [ content, setContent ] = useState<Content>()
    const initial = useContent(id)

    useEffect(() => {
      if (!content && initial) { setContent(initial) }
    }, [ content, initial ])

    if (!content) {
      return (
        <Box height="80vh" width="100%" textAlign="center">
          <CircularProgress sx={{ position: 'absolute', top: '50%' }} />
        </Box>
      )
    }

    return (
      <>
        <Paper sx={{ width: '100%', p: 2, mb: 1, display: 'flex', alignItems: 'center', bgcolor: (theme) => theme.palette.grey[200], borderRadius: 0 }}>
          <IconButton LinkComponent={Link} href="/editor">
            <ChevronLeft />
          </IconButton>
          <Typography display="inline-block" color="#ccc">/</Typography>
          <Box ml={2}>
            <Typography color="#555" fontSize="15px">{TypeToName[content.meta.type]}</Typography>
            <Typography><b>{content.meta.name}</b></Typography>
          </Box>
        </Paper>
        <Box display="flex" alignItems="top">
          <Form
            variant="paper"
            loading={false}
            open={true}
            submit={(d) => saveContent(id, d as any)}
            title="Edit Component"
            onChange={(d) => setContent(d as any)}
            initialData={{ state: content }}
            sx={{ m: 2, p: 2, flex: '33%' }}
            keepDataOnSuccess
          >
            <TextFormField id={['meta', 'id']}   label="ID"   disabled />
            <FormSelect    id={['meta', 'type']} label="Type" disabled options={DropdownAvailableTypes}  />
            <TextFormField id={['meta', 'name']} label="Name" />
            <TypeSpecificFields type={content.meta.type} />
          </Form>
          <Box flex="67%" p={2}>
            { content && <DynamicComponent content={content} /> }
          </Box>
        </Box>
      </>
    )
  }

export default EditorPage
