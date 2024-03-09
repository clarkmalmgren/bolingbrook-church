'use client'

import { DynamicComponent } from '@/components/DynamicComponent'
import { DropdownAvailableTypes, TypeSpecificFields, TypeToName } from '@/components/admin/EditorTypeFields'
import { DataState, Form } from '@/forms/Form'
import { TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { ContentMeta, saveContent, useContent } from '@/services/ContentService'
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
    const [ data, setData ] = useState<ContentMeta<any>>()
    const initial = useContent(id)

    useEffect(() => {
      if (!data && initial) { setData(initial) }
    }, [ data, initial ])

    if (!data) {
      return (
        <Box height="80vh" width="100%" textAlign="center">
          <CircularProgress sx={{ position: 'absolute', top: '50%' }} />
        </Box>
      )
    }

    const initalFormData: DataState = {}
    Object.keys(data).forEach((k) => initalFormData[k] = { value: (data as any)[k] })

    return (
      <>
        <Paper sx={{ width: '100%', p: 2, mb: 1, display: 'flex', alignItems: 'center', bgcolor: (theme) => theme.palette.grey[200], borderRadius: 0 }}>
          <IconButton LinkComponent={Link} href="/editor">
            <ChevronLeft />
          </IconButton>
          <Typography display="inline-block" color="#ccc">/</Typography>
          <Box ml={2}>
            <Typography color="#555" fontSize="15px">{TypeToName[data.type]}</Typography>
            <Typography><b>{data.name}</b></Typography>
          </Box>
        </Paper>
        <Box display="flex" alignItems="top">
          <Form
            variant="paper"
            loading={false}
            open={true}
            submit={(d) => saveContent(id, d as any)}
            title="Edit Component"
            onChange={(d) => setData(d as any)}
            initialData={initalFormData}
            sx={{ m: 2, p: 2, flex: '33%' }}
            keepDataOnSuccess
          >
            <TextFormField id="id" label="ID" disabled />
            <FormSelect id="type" label="Type" options={DropdownAvailableTypes} disabled />
            <TextFormField id="name" label="Name" />
            <TypeSpecificFields type={data.type} />
          </Form>
          <Box flex="67%" p={2}>
            { data && <DynamicComponent content={data} /> }
          </Box>
        </Box>
      </>
    )
  }

export default EditorPage
