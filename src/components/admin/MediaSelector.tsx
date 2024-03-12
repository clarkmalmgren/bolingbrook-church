'use client'

import { useFormField } from '@/forms/Form'
import { useAllMedia, useMedia } from '@/services/MediaService'
import { Add } from '@mui/icons-material'
import { Box, Dialog, DialogActions, DialogContent, FormControl, InputLabel } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { Button } from '../Button'
import { MediaItem } from './MediaItem'
import { MediaTable } from './MediaList'

type MediaSelectorProps = {
  id: string | string[]
  label: string
  required?: boolean
}

export const MediaSelector: FunctionComponent<MediaSelectorProps> =
  ({ id, label, required }) => {
    const [ open, setOpen ] = useState(false)
    const { value, update } = useFormField<string | undefined>(id)
    const all = useAllMedia()
    const selected = useMedia(value)

    const save = (ref: string | undefined) => {
      update(ref, !ref && required)
      setOpen(false)
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
          <Box border="1px solid rgba(0, 0, 0, 0.23)" borderRadius="4px" p={1} sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)}>
            { selected && <MediaItem media={selected} /> }
            { !selected && (
              <Box height={100} display="flex" alignItems="center" justifyContent="center">
                <Add />
              </Box>
            )}
          </Box>
        </FormControl>
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
          <DialogContent>
            <MediaTable all={all || []} onClick={(m) => save(m.id)}/>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => save(undefined)} >Clear</Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
