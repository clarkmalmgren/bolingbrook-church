import { EditorEntry } from '@/services/EditorEntry'
import { ChildSelector, SingleChildSelector } from './admin/ChildSelector'
import { TextFormField } from '@/forms/FormField'

export const PageEditor: EditorEntry = {
  key: 'page',
  name: 'Page',
  form: () => (
    <>
      <TextFormField id={['data', 'path']} label="Path" required helperText="Should start with '/'" />
      <SingleChildSelector id={['data', 'hero']} label="Hero" types={['hero']}/>
      <ChildSelector id={['data', 'children']} label="Children" />
    </>
  )
}
