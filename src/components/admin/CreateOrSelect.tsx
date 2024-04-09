
import { useFilteredContent } from '@/services/ContentService'
import { Add, ChevronLeft } from '@mui/icons-material'
import { Autocomplete, Button, Divider, ListItem, Menu, MenuItem, TextField } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { TypeToName, filteredTypes } from './EditorTypeFields'
import { createNewContent } from '@/services/StagedContentService'


export type CreateOrSelectProps = {
  onAdd: (id: string, created?: boolean) => any
  types?: string[]
}

enum State {
  Closed, Menu, Choose
}

export const CreateOrSelect: FunctionComponent<CreateOrSelectProps> =
  ({ onAdd, types }) => {
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
            <MenuItem onClick={() => { setState(State.Choose); setEl(null) }}>Select Existing</MenuItem>
            <Divider />
            <MenuItem disabled>Create New...</MenuItem>
            {filteredTypes(types).map(t => (
              <MenuItem
                key={t.value}
                onClick={() => {
                  onAdd(createNewContent(t.value), true)
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
              onAdd(v.id)
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
