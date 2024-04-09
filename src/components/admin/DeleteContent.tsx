import { DeleteForever } from '@mui/icons-material'
import { DialogContentText, IconButton } from '@mui/material'
import { FunctionComponent, useState } from 'react'
import { deleteContent } from '@/services/ContentService'
import { Content } from '@/services/models/Content'
import { Form } from '@/forms/Form'
import { TypeToName } from "./EditorTypeFields"
import { TextFormField } from '@/forms/FormField'
import { deleteStagedContent } from '@/services/StagedContentService'

type Props = {
  disabled?: boolean
  content: Content
}

export const DeleteContent: FunctionComponent<Props> =
  ({ disabled, content }) => {
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
          title={`Delete ${content.meta.name}?`}
          submit={async () => {
            await deleteStagedContent(content.meta.id)
            return deleteContent(content.meta.id)
          }}
          submitText="Delete"
          initialData={{ state: { name: '' }, invalid: { name: true } }}
          destructive
        >
          <DialogContentText>
            Are you sure you want to delete "{content.meta.name}" of type "{TypeToName[content.meta.type]}"?
            This is a permenant action and cannot be undone. This does not check to see if any orphaned
            references remain for this content and may create rendering issues if not removed elsewhere.
          </DialogContentText>
          <TextFormField
            id="name"
            label="Type the name below to confirm delete"
            isValid={(v) => v === content.meta.name}
            required
          />
        </Form>
      </div>
    )
  }