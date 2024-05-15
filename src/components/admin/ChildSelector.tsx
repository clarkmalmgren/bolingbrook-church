'use client'

import { useFormField } from '@/forms/Form'
import { useContent, useContents } from '@/services/ContentService'
import { Remove } from '@mui/icons-material'
import { Box, FormControl, IconButton, InputLabel, List, ListItem, Typography } from '@mui/material'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { FunctionComponent } from 'react'
import { ActionType, CreateOrSelect } from './CreateOrSelect'
import { TypeToName } from "./EditorTypeFields"
import { Content } from '@/services/models/Content'

type ChildSelectorProps = {
  id: string | string[]
  label: string
  required?: boolean
  types?: string[]
}

export const ChildSelector: FunctionComponent<ChildSelectorProps> =
  ({ id, label, required, types }) => {
    const { value, update } = useFormField<string[] | undefined>(id)
    const children = useContents(value)
    const router = useRouter()
    const path = usePathname()

    const add = (ref: string, action: ActionType) => {
      const next = value ? [ ...value, ref ] : [ ref ]
      update(next, false)
      if (action === ActionType.Created) {
        router.push(`${path}/${ref}`)
      }
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
            {children?.map((c, i) => (
              <SelectedChildItem key={i} path={path} child={c} remove={() => remove(i)} />
            ))}
            <CreateOrSelect types={types} onAdd={add} />
          </List>
        </FormControl>
      </>
    )
  }

export const SingleChildSelector: FunctionComponent<ChildSelectorProps> =
  ({ id, label, required, types }) => {
    const { value, update } = useFormField<string | undefined>(id)
    const child = useContent(value)
    const router = useRouter()
    const path = usePathname()

    const add = (ref: string, action: ActionType) => {
      update(ref, false)
      if (action === ActionType.Created) {
        router.push(`${path}/${ref}`)
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
            }}>{label}</InputLabel>
          <List sx={{ border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: 4, p: 1 }} >
            { child && <SelectedChildItem path={path} child={child} remove={() => update(undefined, required)} /> }
            { !value && <CreateOrSelect types={types} onAdd={add} /> }
          </List>
        </FormControl>
      </>
    )
  }

type SelectedChildItemProps = {
  path: string
  child: Content
  remove: () => any
}

const SelectedChildItem: FunctionComponent<SelectedChildItemProps> =
  ({ path, child, remove }) => (
    <ListItem>
      <Link href={`${path}/${child.meta.id}`}>
        <Typography sx={{ cursor: 'pointer' }}>
          {TypeToName[child.meta.type]} / {child.meta.name}
        </Typography>
      </Link>
      <Box flex="1" />
      <IconButton onClick={remove} color="warning">
        <Remove />
      </IconButton>
    </ListItem>
  )
