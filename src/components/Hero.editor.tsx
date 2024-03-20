import { FormEditor } from '@/forms/FormEditor'
import { NumberFormField, TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { FormSwitch } from '@/forms/FormSwitch'
import { EditorEntry } from '@/services/EditorEntry'
import { Typography } from '@mui/material'
import { ChildSelector } from './admin/ChildSelector'
import { MediaSelector } from './admin/MediaSelector'

export const HeroEditor: EditorEntry = {
  key: 'hero',
  name: 'Hero',
  form: () => (
    <>
      <MediaSelector id={['data', 'mediaRef']} label="Media" />
      <Typography variant="caption">Use either uploaded media or the URL & video selector below</Typography>
      <TextFormField id={['data', 'media', 'url']} label="Media URL" />
      <FormSwitch    id={['data', 'media', 'video']} label="Is Video?" />

      <NumberFormField id={['data', 'height']} label="Height" />
      <Typography variant="caption">A number between 0.0 & 1.0</Typography>

      <NumberFormField id={['data', 'shade']} label="Shade" />
      <Typography variant="caption">A number between 0.0 & 1.0. 1.0 is solid</Typography>

      <FormSelect    id={['data', 'shadeColor']} label="Shade Color" options={[ 'black', 'white' ]}/>

      <FormSelect    id={['data', 'justify']} label="Justify" options={[ 'flex-start', 'center', 'flex-end', 'space-evenly' ]}/>
      <TextFormField id={['data', 'imagePosition']} label="Image Position" />

      <FormEditor    id={['data', 'body']} label="Body" />
      <ChildSelector id={['data', 'children']} label="Children" onlyTypes={[ 'button' ]} />
    </>
  )
}
