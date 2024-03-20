import { FormEditor } from '@/forms/FormEditor'
import { TextFormField } from '@/forms/FormField'
import { EditorEntry } from '@/services/EditorEntry'
import { MediaSelector } from './admin/MediaSelector'

export const CardEditor: EditorEntry = {
  key: 'card',
  name: 'Card',
  form: () => (
    <>
      <TextFormField id={['data', 'title']} label="Title" required />
      <TextFormField id={['data', 'subtitle']} label="Subtitle" />
      <TextFormField id={['data', 'image']} label="Image" />
      <MediaSelector id={['data', 'mediaRef']} label="Media" />
      <TextFormField id={['data', 'link']} label="Link" />
      <FormEditor    id={['data', 'body']} label="Body" />
    </>
  )
}
