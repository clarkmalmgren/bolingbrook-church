import { FormEditor } from '@/forms/FormEditor'
import { EditorEntry } from '@/services/EditorEntry'

export const RichTextEditor: EditorEntry = {
  key: 'richtext',
  name: 'Rich Text',
  form: () => (<FormEditor id={['data', 'data']} label="Rich Text Blocks" />)
}
