'use client'

import { Form, tryResponse, useFormField } from '@/forms/Form'
import { FormEditor } from '@/forms/FormEditor'
import { NumberFormField, TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { EditorEntry } from '@/services/EditorEntry'
import { Add, Edit, Remove } from '@mui/icons-material'
import { Box, FormControl, IconButton, InputLabel, List, ListItem, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { FlexChild } from './Flex'
import { ChildSelector } from './admin/ChildSelector'
import { MediaSelector } from './admin/MediaSelector'
import { FormSwitch } from '@/forms/FormSwitch'

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
    const [ newOpen, setNewOpen ] = useState(false)
    const [ open, setOpen ] = useState(false)
    const [ child, setChild ] = useState<[FlexChild, number] | undefined>()
    const { value, update } = useFormField<FlexChild[] | undefined>(id)

    const save = (child: FlexChild, index: number) => {
      const next = value ? [ ...value ] : []
      next[index] = child
      update(next, false)
    }

    const remove = (index: number) => {
      const next = value ? [ ...value ] : []
      next.splice(index, 1)
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
            }}>Contents</InputLabel>
          <List sx={{ border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: 4, p: 1 }} >
            {value?.map((c, i) => (
              <ListItem key={i}>
                <Typography>{ c.type }</Typography>
                <Box flex="1" />

                <IconButton onClick={() => {
                  setChild([c, i])
                  setOpen(true)
                }}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => remove(i)} color="warning">
                  <Remove />
                </IconButton>
              </ListItem>
            ))}
            <ListItem
              sx={{
                cursor: 'pointer',
                height: 50,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={() => setNewOpen(true) }
            >
              <Add />
            </ListItem>
          </List>
        </FormControl>

        <Form
          open={newOpen}
          loading={false}
          title="Add New Flex Child"
          submit={(c) => tryResponse(() => {  
            const next = [ c as FlexChild, value?.length || 0 ] as [ FlexChild, number ]
            save(...next)
            setNewOpen(false)

            if (next[0].type !== 'break') {
              setOpen(true)
              setChild(next)
            }
          })}
          onClose={() => setNewOpen(false)}
        >
          <FormSelect id="type" label="Type" required options={[ 'content', 'media', 'text', 'break' ]} />
        </Form>

        { child &&
          <Form
            open={open}
            loading={false}
            title="Edit Flex Child"
            initialData={{ state: child[0] }}
            submit={(c) => tryResponse(() => {
              save(c as FlexChild, child[1])
              setOpen(false)
              setChild(undefined)
            })}
            onClose={() => {
              setOpen(false)
              setChild(undefined)
            }}
          >
            <FormSelect id="type" label="Type" required disabled options={[ 'content', 'media', 'text', 'break' ]} />
            <TextFormField id="flex" label="Flex" />
            <NumberFormField id="minWidth" label="Minimum Width (px)" />

            { child[0].type === 'content' && <ChildSelector id="refs" label="Component(s)" /> }
            { child[0].type === 'media'   && <MediaSelector id="ref"  label="Media" /> }
            { child[0].type === 'text'    && <FormEditor    id="body" label="Body" /> }
          </Form>
        }
      </>
    )
  }
