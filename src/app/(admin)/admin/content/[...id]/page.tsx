'use client'

import { ComponentById } from '@/components/DynamicComponent'
import { DropdownAvailableTypes, TypeSpecificFields, TypeToName } from '@/components/admin/EditorTypeFields'
import { Form } from '@/forms/Form'
import { TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { ContentOverrides, useContent } from '@/services/ContentService'
import { stageContent, useStagedContentMap } from '@/services/StagedContentService'
import { ChevronLeft } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Paper, Typography } from '@mui/material'
import Link from 'next/link'
import { FunctionComponent } from 'react'

type EditorPageProps = {
  params: {
    id: string[]
  }
}

const Crumb: FunctionComponent<{ id: string }> = 
  ({ id }) => {
    const content = useContent(id)
    return content && (
      <>
        <Typography display="inline-block" color="#ccc">/</Typography>
        <Box ml={2} mr={2}>
          <Typography color="#555" fontSize="13px" mb="-5px">{TypeToName[content.meta.type]}</Typography>
          <Typography><b>{content.meta.name}</b></Typography>
          <Typography color="#555" fontSize="10px" mt="-4px" mb={0}>{content.meta.id}</Typography>
        </Box>
      </>
    )
  }

const Editor: FunctionComponent<{ id: string }> = 
  ({ id }) => {
    const content = useContent(id)

    if (!content) {
      return (
        <Box height="80vh" width="100%" textAlign="center">
          <CircularProgress sx={{ position: 'absolute', top: '50%' }} />
        </Box>
      )
    } else {
      return (
        <Form
          variant="paper"
          onChange={(d) => stageContent(id, d as any)}
          initialData={{ state: content }}
          sx={{ m: 2, p: 2, flex: '33%' }}
        >
          <Box display="none">
            <TextFormField id={['meta', 'id']}   label="ID"   disabled />
            <FormSelect    id={['meta', 'type']} label="Type" disabled options={DropdownAvailableTypes}  />
          </Box>
          <TextFormField id={['meta', 'name']} label="Name" required />
          <TypeSpecificFields type={content.meta.type} />
        </Form>
      )
    }
  }

const EditorPage: FunctionComponent<EditorPageProps> =
  ({ params }) => {
    const overrides = useStagedContentMap()

    const ids = params.id
    const previewId = ids[0]
    const editorId = ids[ids.length - 1]
    const previous = '/admin/content/' + ids.slice(0, -1).join('/')

    if (typeof overrides === 'undefined') { return null }

    return (
      <ContentOverrides.Provider value={overrides}>
        <Paper sx={{ width: '100%', p: 2, mb: 1, display: 'flex', alignItems: 'center', bgcolor: (theme) => theme.palette.grey[200], borderRadius: 0 }}>
          <IconButton LinkComponent={Link} href={ ids.length > 1 ? previous : '/admin' }>
            <ChevronLeft />
          </IconButton>
          { ids.map((v, i)  => <Crumb key={i} id={v} />) }
        </Paper>
        <Box display="flex" alignItems="top">
          <Editor id={editorId} />
          <Box flex="67%" p={2}>
            <ComponentById id={previewId} />
          </Box>
        </Box>
      </ContentOverrides.Provider>
    )
  }

export default EditorPage
