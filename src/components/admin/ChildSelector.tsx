'use client'

import { useFormField } from '@/forms/Form'
import { useContents } from '@/services/ContentService'
import { Remove } from '@mui/icons-material'
import { Box, FormControl, IconButton, InputLabel, List, ListItem, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { ActionType, CreateOrSelect } from './CreateOrSelect'
import { TypeToName } from "./EditorTypeFields"

type ChildSelectorProps = {
  id: string | string[]
  label: string
  required?: boolean
  types?: string[]
}

export const ChildSelector: FunctionComponent<ChildSelectorProps> =
  ({ id, label, required, types }) => {
    const { value, update } = useFormField<string[] | undefined>(id)
    const selected = useContents(value)
    const router = useRouter()
    const path = usePathname()

    const add = (ref: string) => {
      const next = value ? [ ...value, ref ] : [ ref ]
      update(next, false)
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
              <ListItem key={i}>
                <Link href={`${path}/${c.meta.id}`}>
                  <Typography sx={{ cursor: 'pointer' }}>
                    {TypeToName[c.meta.type]} / {c.meta.name}
                  </Typography>
                </Link>
                <Box flex="1" />
                <IconButton onClick={() => remove(i)} color="warning">
                  <Remove />
                </IconButton>
              </ListItem>
            ))}
            <CreateOrSelect types={types} onAdd={(id, action) => {
              add(id)
              if (action === ActionType.Created) {
                router.push(`${path}/${id}`)
              }
            }} />
          </List>
        </FormControl>
      </>
    )
  }

