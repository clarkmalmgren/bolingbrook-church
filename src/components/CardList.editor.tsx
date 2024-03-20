import { EditorEntry } from '@/services/EditorEntry'
import { ChildSelector } from './admin/ChildSelector'

export const CardListEditor: EditorEntry = {
  key: 'cardlist',
  name: 'Card List',
  form: () => (<ChildSelector id={['data', 'children']} label="Cards" onlyTypes="card" />)
}
