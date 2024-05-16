import { FormEditor } from '@/forms/FormEditor'
import { NumberFormField, TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { FormSwitch } from '@/forms/FormSwitch'
import { EditorEntry } from '@/services/EditorEntry'
import { Typography } from '@mui/material'
import { ChildSelector } from './admin/ChildSelector'
import { MediaSelector } from './admin/MediaSelector'

export const IframeEditor: EditorEntry = {
  key: 'iframe',
  name: 'Iframe',
  form: () => (
    <>
      <NumberFormField id={['data', 'height']} label="Height" required helperText="Height for the embedded iframe in pixels" />
      <TextFormField id={['data', 'url']} label="URL" helperText="The URL of the iframe to embed" />
      <TextFormField id={['data', 'data']} label="Data" helperText="Embedded contents for the iFrame. This should be base64 encoded." />
    </>
  )
}
