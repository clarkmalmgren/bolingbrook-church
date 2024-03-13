import { FormEditor } from '@/forms/FormEditor'
import { TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { FunctionComponent } from 'react'
import { MediaSelector } from './MediaSelector'
import { ChildSelector } from './ChildSelector'


export const TypeToName: Record<string, string> = {
  button: 'Button',
  card: 'Card',
  cardlist: 'Card List',
  richtext: 'Rich Text',
}

export const DropdownAvailableTypes: { value: string, label: string }[] =
  Object
    .keys(TypeToName)
    .reduce((a, k) => [ ...a, { value: k, label: TypeToName[k] }], [] as { value: string, label: string }[])
    .sort((a, b) => a.label.localeCompare(b.label))

export const TypeSpecificFields: FunctionComponent<{ type: string }> =
  ({ type }) => {
    switch (type) {
      case 'button':
        return (
          <>
            <TextFormField id={['data', 'text']} label="Text" required />
            <TextFormField id={['data', 'link']} label="link" />
            <FormSelect    id={['data', 'size']} label="Size" options={[ 'small', 'medium', 'large' ]}/>
          </>
        )

      case 'card':
        return (
          <>
            <TextFormField id={['data', 'title']} label="Title" required />
            <TextFormField id={['data', 'subtitle']} label="Subtitle" />
            <TextFormField id={['data', 'image']} label="Image" />
            <MediaSelector id={['data', 'mediaRef']} label="Media" />
            <TextFormField id={['data', 'link']} label="Link" />
            <FormEditor    id={['data', 'body']} label="Body" />
          </>
        )

      case 'cardlist':
        return (
          <>
            <ChildSelector id={['data', 'children']} label="Cards" onlyTypes="card" />
          </>
        )

      case 'richtext':
        return (<FormEditor id={['data', 'data']} label="Rich Text Blocks" />)


      default: 
        return null
    }

  }