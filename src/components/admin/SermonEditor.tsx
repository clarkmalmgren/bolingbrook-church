'use client'

import { Form, FormResponse, useFormField } from '@/forms/Form'
import { DateFormField, TextFormField, TimeFormField } from '@/forms/FormField'
import { saveSermon } from '@/services/SermonService'
import { Sermon, Service } from '@/services/models/sermon'
import { Add, Remove } from '@mui/icons-material'
import { Box, Button, Paper, Typography } from '@mui/material'
import { FunctionComponent } from 'react'

export type SermonEditorProps = {
  initial?: Sermon
  onClose: () => void
}

export const SermonEditor: FunctionComponent<SermonEditorProps> =
  ({ initial, onClose }) => {
    async function save(sermon: Sermon): Promise<FormResponse<Sermon>> {
      const s = await saveSermon(sermon)
      onClose()
      return s
    }

    return (
      <Form
        variant='dialog'
        initialData={{ state: initial || {} }}
        submit={(d) => save(d as Sermon)}
        open={true}
        onClose={onClose}
      >
        <DateFormField required id="date" disabled={!!initial} label="Date" />
        <TextFormField required id="title" label="Title" />
        <TextFormField id="series" label="Series" />
        <TextFormField id="speaker" label="Speaker" />
        <TextFormField id="description" multiline label="Description" />

        <ServicesEditor />
      </Form>
    )
  }

export const ServicesEditor: FunctionComponent<{}> =
  () => {
    const { value, update } = useFormField<Partial<Service>[] | undefined>('services')

    const add = () => {
      const next = value ? [ ...value, {} ] : [ {} ]
      update(next)
    }

    const remove = (index: number) => {
      const next = value ? [ ...value ] : []
      next.splice(index, 1)
      update(next)
    }

    return (
      <>
        <Box display="flex" pb={1} pt={1} >
          <Typography>Service(s)</Typography>
          <Box flex={1} />
          <Button onClick={add}><Add /></Button>
        </Box>
        { value?.map((s, i) => <ServiceEditor key={i} id={i} remove={() => remove(i)} />) }
      </>
    )
  }


export const ServiceEditor: FunctionComponent<{ id: number, remove: () => void }> =
  ({ id, remove }) => (
    <Paper sx={{ p: 1 }}>
      <Box display="flex">
        <TextFormField required id={['services', id, 'identifier']} label="Identifier" />
        <Button onClick={remove}><Remove /></Button>
      </Box>
      <TimeFormField required id={['services', id, 'start']} label="StartTime" />
      <TextFormField required id={['services', id, 'youtube']} label="YouTube ID" />
    </Paper>
  )