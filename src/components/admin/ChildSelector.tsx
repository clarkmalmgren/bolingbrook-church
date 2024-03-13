'use client'

import { useFormField } from '@/forms/Form'
import { useContents, useFilteredContent } from '@/services/ContentService'
import { Add, Remove } from '@mui/icons-material'
import { Box, Dialog, DialogContent, FormControl, IconButton, InputLabel, List, ListItem, Typography } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { ContentTable } from './ContentList'
import { TypeToName } from './EditorTypeFields'

type ChildSelectorProps = {
  id: string | string[]
  label: string
  required?: boolean
  onlyTypes?: string | string[]
}

export const ChildSelector: FunctionComponent<ChildSelectorProps> =
  ({ id, label, required, onlyTypes }) => {
    const [ open, setOpen ] = useState(false)
    const { value, update } = useFormField<string[] | undefined>(id)
    const all = useFilteredContent(onlyTypes)
    const selected = useContents(value)

    const add = (ref: string) => {
      const next = value ? [ ...value, ref ] : [ ref ]
      update(next, false)
      setOpen(false)
    }

    const remove = (index: number) => {
      const next = value ? [ ...value ] : []
      next.splice(index, 1)
      update(next, required && next.length === 0)
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
            }}>{label}</InputLabel>
          <List sx={{ border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: 4, p: 1 }} >
            {selected?.map((c, i) => (
              <ListItem key={c.meta.id}>
                <Typography>{TypeToName[c.meta.type]} / {c.meta.name}</Typography>
                <Box flex="1" />
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
              onClick={() => setOpen(true)}
            >
              <Add />
            </ListItem>
          </List>
        </FormControl>
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogContent>
            <ContentTable all={all || []} onClick={(c) => add(c.meta.id)} />
          </DialogContent>
        </Dialog>
      </>
    )
  }
