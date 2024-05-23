'use client'

import { Form } from '@/forms/Form'
import { useFormField } from '@/forms/useFormField'
import { FormEditor } from '@/forms/FormEditor'
import { NumberFormField, TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { FormSwitch } from '@/forms/FormSwitch'
import { EditorEntry } from '@/services/EditorEntry'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import { FlexChild } from './Flex'
import { ActionType, CreateOrSelect } from './admin/CreateOrSelect'
import { MediaSelector } from './admin/MediaSelector'

export const FlexEditor: EditorEntry = {
  key: 'flex',
  name: 'Flex',
  form: () => (
    <>
      <FormSelect id={['data', 'direction']} label="Direction" options={['row', 'column']}  />
      <FormSwitch id={['data', 'wrap']} label="Wrap" />
      <FormFlex id={[ 'data', 'children' ]} />
    </>
  )
}

type FormFlexProps = {
  id: string | string[]
}

export const FormFlex: FunctionComponent<FormFlexProps> =
  ({ id }) => {
    const [ open, setOpen ] = useState(false)
    const { value, update } = useFormField<FlexChild[] | undefined>(id)
    const router = useRouter()
    const path = usePathname()

    const save = (child: FlexChild, index: number) => {
      const next = value ? [ ...value ] : []
      next[index] = child
      update(next)
    }

    const remove = (index: number) => {
      const next = value ? [ ...value ] : []
      next.splice(index, 1)
      update(next)
    }

    const add = (id: string, action: ActionType) => {
      const index = value?.length || 0
      if (action === ActionType.Custom) {
        const next = { type: id.toLowerCase() } as FlexChild
        save(next, index)
      } else {
        save({ type: 'content', ref: id }, index)
        if (action === ActionType.Created) {
          router.push(`${path}/${id}`)
        }
      }
    }

    const move = (index: number, offset: number) => {
      if (!value) { return }
      const next = [ ...value ]
      const a = next[index]
      const b = next[index + offset]
      next[index] = b
      next[index + offset] = a
      update(next)
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
            }}>Contents</InputLabel>
          <Box sx={{ border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: 4, p: 1 }} >
            { value?.map((c, i) =>
              <FlexChildEditor
                key={i}
                child={c}
                onChange={(c) => save(c, i)}
                onDelete={() => remove(i)}
                onMove={(o) => move(i, o)}
                first={i === 0}
                last={i === value.length - 1}
              />
            )}
            <CreateOrSelect custom={[ 'Media', 'Text', 'Break' ]} onAdd={add} />
          </Box>
        </FormControl>
      </>
    )
  }

type FlexChildEditorProps = {
  child: FlexChild
  onChange: (child: FlexChild) => void
  onDelete: () => void
  onMove: (offset: number) => void
  first?: boolean
  last?: boolean
}

const FlexChildEditor: FunctionComponent<FlexChildEditorProps> =
  ({ child, onChange, onDelete, onMove, first, last }) => (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{ child.type }</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Form
          initialData={{ state: child }}
          onChange={(c) => onChange(c as any)}
          variant="box"
          nested
        >
          <TextFormField id="flex" label="Flex" />
          <NumberFormField id="minWidth" label="Minimum Width (px)" />

          { child.type === 'content' && <Typography>{child.ref}</Typography> }
          { child.type === 'media'   && <MediaSelector id="ref"  label="Media" /> }
          { child.type === 'text'    && <FormEditor    id="body" label="Body" /> }
        </Form>
      </AccordionDetails>
      <AccordionActions>
        {!first && <Button onClick={() => onMove(-1)}>Move Up</Button> }
        {!last && <Button onClick={() => onMove(1)}>Move Down</Button> }
        <Button color="error" onClick={onDelete}>Delete</Button>
      </AccordionActions>
    </Accordion>
  )
