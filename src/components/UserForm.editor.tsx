'use client'

import { Form, useFormField } from '@/forms/Form'
import { FormEditor } from '@/forms/FormEditor'
import { NumberFormField, TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { FormSwitch } from '@/forms/FormSwitch'
import { EditorEntry } from '@/services/EditorEntry'
import { Add, ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, ListItem, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import { ActionType, CreateOrSelect } from './admin/CreateOrSelect'
import { MediaSelector } from './admin/MediaSelector'
import { GridChild } from './Grid'
import { Prompt } from './UserForm'

export const UserFormEditor: EditorEntry = {
  key: 'form',
  name: 'Form',
  form: () => (
    <>
      <TextFormField id={['data', 'formTitle']} label="Title" helperText="Shown to User" required />
      <TextFormField id={['data', 'emailTitle']} label="Email Title" helperText="Title of Email Sent on Submit" required />
      <TextFormField id={['data', 'emailHeader']} label="Email Header" helperText="Header included on Email" required />
      <TextFormField id={['data', 'linkOnSuccess']} label="Link on Success" helperText="Redirect on Success" />
      
      <FormUserForm id={[ 'data', 'prompts' ]} />
    </>
  )
}

type FormUserFormProps = {
  id: string | string[]
}

export const FormUserForm: FunctionComponent<FormUserFormProps> =
  ({ id }) => {
    const { value, update } = useFormField<Prompt[] | undefined>(id)

    const save = (p: Prompt, index: number) => {
      const next = value ? [ ...value ] : []
      next[index] = p
      update(next, false)
    }

    const remove = (index: number) => {
      const next = value ? [ ...value ] : []
      next.splice(index, 1)
      update(next, false)
    }

    const add = () => {
      const index = value?.length || 0
      const next = value ? [ ...value ] : []
      next.push({ type: 'string', key: '' })
      update(next, false)
    }

    return (
      <>
        <FormControl fullWidth variant="outlined" sx={{ mt: 1, mb: 1 }}>
          <InputLabel
            shrink
            sx={{
              background: 'linear-gradient(0deg, rgba(255,255,255,0) 15%, rgba(255,255,255,1) 40%)',
              pl: 1,
              pr: 1
            }}>Prompts</InputLabel>
          <Box sx={{ border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: 4, p: 1 }} >
            { value?.map((p, i) =>
              <PromptEditor
                key={i}
                value={p}
                onChange={(next) => save(next, i)}
                onDelete={() => remove(i)}
              />
            )}
            <ListItem
              sx={{
                cursor: 'pointer',
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={add}
            >
              <Add />
            </ListItem>
          </Box>
        </FormControl>
      </>
    )
  }

type PromptEditorProps = {
  value: Prompt
  onChange: (next: Prompt) => void
  onDelete: () => void
}

const PromptEditor: FunctionComponent<PromptEditorProps> =
  ({ value, onChange, onDelete }) => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{ value.key }</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form
          initialData={{ state: value }}
          onChange={(c) => onChange(c as any)}
          variant="box"
          nested
        >
          <FormSelect id="type" label="type" options={[ 'string', 'number', 'checkbox' ]} />
          <TextFormField id="key" label="Key" helperText="Form Field Name" />
          <FormSwitch id="required" label="Required" />

          { value.type === 'checkbox' &&
            <TextFormField
              id="options"
              label="Options"
              helperText="One option per line"
              multiline
            />
          }
        </Form>
      </AccordionDetails>
      <AccordionActions>
        <Button color="error" onClick={onDelete}>Delete</Button>
      </AccordionActions>
    </Accordion>
  )
