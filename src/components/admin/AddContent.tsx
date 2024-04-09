import { createNewContent } from '@/services/StagedContentService'
import { Add } from '@mui/icons-material'
import { Button, Menu, MenuItem } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { filteredTypes } from './EditorTypeFields'

export type AddContentProps = {
  types?: string[]
  onAdd: (id: string) => any
}

export const AddContent: FunctionComponent<AddContentProps> =
  ({ types, onAdd }) => {
    const [ el, setEl ] = useState<HTMLElement>()

    return (
      <>
        <Button
          variant="contained"
          sx={{ m: 0, ml: 2, mr: 2 }}
          size="small"
          onClick={(e) => setEl(e.currentTarget)}
        >
          Add <Add />
        </Button>
        <Menu
          open={!!el}
          onClose={() => setEl(undefined)}
          anchorEl={el}
        >
          {filteredTypes(types).map(t => (
            <MenuItem
              key={t.value}
              onClick={() => {
                onAdd(createNewContent(t.value))
                setEl(undefined)
              }}
            >{t.label}</MenuItem>
          ))}
        </Menu>
      </>
    )
  }