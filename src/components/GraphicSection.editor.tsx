import { FormEditor } from '@/forms/FormEditor'
import { NumberFormField, TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { EditorEntry } from '@/services/EditorEntry'
import { MediaSelector } from './admin/MediaSelector'

export const GraphicSectionEditor: EditorEntry = {
  key: 'graphicSection',
  name: 'Graphic Section',
  form: () => (
    <>
      <MediaSelector   id={['data', 'image']} label="Image" required />
      <FormSelect      id={['data', 'displayStyle']} label="Display Style" options={[ 'Collapse', 'Full', 'Page Width' ]}/>
      <FormEditor      id={['data', 'content']} label="Content" />
      <NumberFormField id={['data', 'shade']} label="Shade" />
      <TextFormField   id={['data', 'link']} label="Link" />
      <FormSelect      id={['data', 'colorScheme']} label="Color Scheme" options={[ 'black on white', 'white on black' ]}/>
      <FormSelect      id={['data', 'alignment']} label="Alignment" options={[ 'left', 'right' ]}/>
      <TextFormField   id={['data', 'imagePosition']} label="Image Position" />
    </>
  )
}
