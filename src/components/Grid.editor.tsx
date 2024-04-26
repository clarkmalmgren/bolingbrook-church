'use client'

import { Form, useFormField } from '@/forms/Form'
import { FormEditor } from '@/forms/FormEditor'
import { NumberFormField, TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { FormSwitch } from '@/forms/FormSwitch'
import { EditorEntry } from '@/services/EditorEntry'
import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionActions, AccordionDetails, AccordionSummary, Box, Button, FormControl, InputLabel, Typography } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { FunctionComponent, useState } from 'react'
import { ActionType, CreateOrSelect } from './admin/CreateOrSelect'
import { MediaSelector } from './admin/MediaSelector'
import { GridChild } from './Grid'

export const GridEditor: EditorEntry = {
  key: 'grid',
  name: 'Grid',
  form: () => (
    <>
      <TextFormField id={['data', 'colWidths']} label="Column Widths" />
      <NumberFormField id={['data', 'gap']} label="Gap" helperText="In Spacing Units" />
      <TextFormField id={['data', 'defaultWidth']} label="Default Width" />
      <TextFormField id={['data', 'defaultHeight']} label="Default Height" />
      
      <FormGrid id={[ 'data', 'children' ]} />
    </>
  )
}

type FormGridProps = {
  id: string | string[]
}

export const FormGrid: FunctionComponent<FormGridProps> =
  ({ id }) => {
    const [ open, setOpen ] = useState(false)
    const { value, update } = useFormField<GridChild[] | undefined>(id)
    const router = useRouter()
    const path = usePathname()

    const save = (child: GridChild, index: number) => {
      const next = value ? [ ...value ] : []
      next[index] = child
      update(next, false)
    }

    const remove = (index: number) => {
      const next = value ? [ ...value ] : []
      next.splice(index, 1)
      update(next, false)
    }

    const add = (id: string, action: ActionType) => {
      const index = value?.length || 0
      if (action === ActionType.Custom) {
        const next = { type: id.toLowerCase() } as GridChild
        save(next, index)
      } else {
        save({ type: 'content', ref: id }, index)
        if (action === ActionType.Created) {
          router.push(`${path}/${id}`)
        }
      }
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
              <GridChildEditor
                key={i}
                child={c}
                onChange={(c) => save(c, i)}
                onDelete={() => remove(i)}
              />
            )}
            <CreateOrSelect custom={[ 'Media', 'Text', 'Break' ]} onAdd={add} />
          </Box>
        </FormControl>
      </>
    )
  }

type GridChildEditorProps = {
  child: GridChild
  onChange: (child: GridChild) => void
  onDelete: () => void
}

const GridChildEditor: FunctionComponent<GridChildEditorProps> =
  ({ child, onChange, onDelete }) => (
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
          <NumberFormField id="row" label="Row" />
          <NumberFormField id="col" label="Column" />
          <NumberFormField id="rowSpan" label="RowSpan" />
          <NumberFormField id="colSpan" label="ColumnSpan" />

          { child.type === 'content' && <Typography>{child.ref}</Typography> }
          { child.type === 'media'   && <MediaSelector id="ref"  label="Media" /> }
          { child.type === 'text'    && <FormEditor    id="body" label="Body" /> }
        </Form>
      </AccordionDetails>
      <AccordionActions>
        <Button color="error" onClick={onDelete}>Delete</Button>
      </AccordionActions>
    </Accordion>
  )
