
import { useFilteredContent } from '@/services/ContentService'
import { Add, ChevronLeft } from '@mui/icons-material'
import { Autocomplete, Button, Divider, ListItem, Menu, MenuItem, TextField } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { TypeToName, filteredTypes } from './EditorTypeFields'
import { createNewContent } from '@/services/StagedContentService'

export enum ActionType { Created, Selected, Custom }

export type CreateOrSelectProps = {
  onAdd: (id: string, action: ActionType) => any
  types?: string[]
  custom?: string[]
}

enum State { Closed, Menu, Choose }

export const CreateOrSelect: FunctionComponent<CreateOrSelectProps> =
  ({ onAdd, types, custom }) => {
    const [ el, setEl ] = useState<HTMLElement | null>(null)
    const [state, setState] = useState<State>(State.Closed)
    const all = useFilteredContent(types)

    if (state === State.Closed || state === State.Menu) {
      return (
        <>
          <ListItem
            sx={{
              cursor: 'pointer',
              height: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => {
              setEl(e.currentTarget.parentElement)
              setState(State.Menu)
            }}
          >
            <Add />
          </ListItem>
          <Menu
            open={!!el}
            onClose={() => { setState(State.Closed); setEl(null) }}
            anchorEl={el}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem onClick={() => { setState(State.Choose); setEl(null) }}>Existing Content</MenuItem>
            { custom?.map(c =>
              <MenuItem
                key={c}
                onClick={() => {
                  onAdd(c, ActionType.Custom)
                  setEl(null)
                  setState(State.Closed)
                }}
              >{c}</MenuItem>
            ) }
            <Divider />
            <MenuItem disabled>Create New...</MenuItem>
            {filteredTypes(types).map(t => (
              <MenuItem
                key={t.value}
                onClick={() => {
                  onAdd(createNewContent(t.value), ActionType.Created)
                  setEl(null)
                  setState(State.Closed)
                }}
              >{t.label}</MenuItem>
            ))}
          </Menu>
        </>
      )
    } else if (state === State.Choose) {
      return (
        <ListItem>
          <ChevronLeft
            sx={{ cursor: 'pointer', mr: 1 }}
            onClick={() => setState(State.Closed)}
          />
          <Autocomplete
            fullWidth
            options={all?.map(c => ({ id: c.meta.id, label: `${TypeToName[c.meta.type]} / ${c.meta.name}` })) || []}
            onChange={(e, v) => {
              if (!v) { return }
              onAdd(v.id, ActionType.Selected)
              setState(State.Closed)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Child"
              />
            )}
          />
        </ListItem>
      )
    }
  }
