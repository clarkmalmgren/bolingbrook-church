import { Random } from '@/services/utils/Random'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import Header from '@editorjs/header'
import { Box, FormControl, InputLabel } from '@mui/material'
import { FunctionComponent, useEffect, useRef, useState } from 'react'
import { useFormField } from './Form'

type EditorProps = {
  id: string | string[]
  label: string
}

export const FormEditorClient: FunctionComponent<EditorProps> =
  ({ id, label }) => {
    const editor = useRef<EditorJS | undefined>()
    const [ holderId ] = useState('editorjs_holder_' + Random.string(8))
    const { value, update } = useFormField<OutputData | undefined>(id)

    useEffect(() => {
      if (typeof window === 'undefined') {
        return
      }
      if (editor.current) { return }

      editor.current = new EditorJS({
        holder: holderId,
        tools: {
          header: Header
        },
        data: value,
        onChange: async () => {
          const out = await editor.current?.save()
          update(out)
        }
      })
    }, [])

    return (
      <FormControl fullWidth variant="outlined" sx={{ mt: 1, mb: 1 }}>
        <InputLabel shrink sx={{ backgroundColor: 'white', pl: 1, pr: 1 }}>{label}</InputLabel>
        <Box border="1px solid rgba(0, 0, 0, 0.23)" borderRadius="4px" p={1}>
          <div id={holderId}></div>
        </Box>
      </FormControl>
    )
  }
