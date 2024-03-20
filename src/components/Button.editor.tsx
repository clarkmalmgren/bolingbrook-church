import { TextFormField } from '@/forms/FormField'
import { FormSelect } from '@/forms/FormSelect'
import { FormSwitch } from '@/forms/FormSwitch'
import { EditorEntry } from '@/services/EditorEntry'
import { Link, Typography } from '@mui/material'
import NextLink from 'next/link'

export const ButtonEditor: EditorEntry = {
  key: 'button',
  name: 'Button',
  form: () => (
    <>
      <TextFormField id={['data', 'text']} label="Text" required />
      <TextFormField id={['data', 'link']} label="link" />
      <FormSelect    id={['data', 'size']} label="Size" options={[ 'small', 'medium', 'large' ]}/>
      <FormSelect    id={['data', 'variant']} label="Variant" options={[ 'text', 'contained', 'outlined' ]}/>
      <FormSwitch    id={['data', 'disabled']} label="Disabled" />
      <FormSwitch    id={['data', 'fullWidth']} label="Full Width" />
      <FormSelect    id={['data', 'color']} label="Color" options={[ 'primary', 'secondary', 'success', 'error', 'warning', 'info', 'inherit' ]}/>
      <FormSelect    id={['data', 'textSize']} label="Text Size" options={[ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'inherit' ]}/>
      <TextFormField id={['data', 'textColor']} label="Text Color" />
      <Typography variant="caption">
        Can either be the same as the options for color (primary, secondary, ...) or any CSS compatible
        color value. For example,
        a <Link component={NextLink} href="https://www.w3schools.com/cssref/css_colors.php">color name</Link> like
        "white" or a hex code like "#efefef" (quotes not required).
      </Typography>
    </>
  )
}
