import { Form } from '@/forms/Form'
import { TextFormField } from '@/forms/FormField'
import { MediaRef, deleteMedia } from '@/services/MediaService'
import { DeleteForever } from '@mui/icons-material'
import { DialogContentText, IconButton } from '@mui/material'
import { FunctionComponent, useState } from 'react'

type Props = {
  disabled?: boolean
  media: MediaRef
}

export const DeleteMedia: FunctionComponent<Props> =
  ({ disabled, media }) => {
    const [ open, setOpen ] = useState(false)

    return (
      <div onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>
        <IconButton
          disabled={disabled}
          color="error"
          onClick={() => setOpen(true)}
        >
          <DeleteForever />
        </IconButton>
        <Form
          open={open}
          onClose={() => setOpen(false)}
          loading={false}
          title={`Delete ${media.name}?`}
          submit={() => deleteMedia(media.id)}
          submitText="Delete"
          initialData={{ state: { name: '' }, invalid: { name: true } }}
          destructive
        >
          <DialogContentText>
            Are you sure you want to delete "{media.name}"?
            This is a permenant action and cannot be undone. This does not check to see if any orphaned
            references remain for this content and may create rendering issues if not removed elsewhere.
          </DialogContentText>
          <TextFormField
            id="name"
            label="Type the name below to confirm delete"
            isValid={(v) => v === media.name}
            required
          />
        </Form>
      </div>
    )
  }