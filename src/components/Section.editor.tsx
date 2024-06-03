import { FormEditor } from '@/forms/FormEditor'
import { FormSelect } from '@/forms/FormSelect'
import { FormSwitch } from '@/forms/FormSwitch'
import { EditorEntry } from '@/services/EditorEntry'
import { ChildSelector } from './admin/ChildSelector'
import { TextFormField } from '@/forms/FormField'
import { MediaSelector } from './admin/MediaSelector'

export const SectionEditor: EditorEntry = {
  key: 'section',
  name: 'Section',
  form: () => (
    <>
      <TextFormField   id={['data', 'header', 'text']} label="Header Text" />
      <MediaSelector   id={['data', 'header', 'image']} label="Header Icon" />
      <FormSelect      id={['data', 'bgcolor']} label="Background Color" options={[ 'white', 'gray', 'dark' ]}/>
      <FormSelect      id={['data', 'align']} label="Alignment" options={[ 'left', 'center', 'right' ]}/>
      <FormSwitch      id={['data', 'wide']} label="Wide" />
      <FormSwitch      id={['data', 'dense']} label="Dense" />
      <FormEditor      id={['data', 'body']} label="Content" />
      <ChildSelector   id={['data', 'children']} label="Children" />
    </>
  )
}
