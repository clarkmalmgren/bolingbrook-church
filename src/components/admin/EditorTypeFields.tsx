import { FormEditor } from '@/forms/FormEditor'
import { TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { FunctionComponent } from 'react'


export const TypeToName: Record<string, string> = {
  richtext: 'Rich Text',
  button: 'Button'
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
            <TextFormField id="text" label="Text" required />
            <TextFormField id="link" label="link" />
            <FormSelect id="size" label="Size" options={[ 'small', 'medium', 'large' ]}/>
          </>
        )

      case 'richtext':
        return (<FormEditor id="data" label="Rich Text Blocks" />)


      default: 
        return null
    }

  }