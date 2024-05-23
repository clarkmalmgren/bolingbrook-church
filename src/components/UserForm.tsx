import { Form, FormResponse } from '@/forms/Form'
import { FormCheckboxes } from '@/forms/FormCheckboxes'
import { NumberFormField, TextFormField } from '@/forms/FormField'
import { useFormService } from '@/services/UseFormService'
import { Typography } from '@mui/material'
import { FunctionComponent } from 'react'

export type PromptBase<T extends string> = { type: T, key: string, required?: boolean, narrow?: boolean }

export type StringPrompt = PromptBase<'string'>
export type NumberPrompt = PromptBase<'number'>
export type CheckboxPrompt = PromptBase<'checkbox'> & { options: string }

export type Prompt = StringPrompt | NumberPrompt | CheckboxPrompt

export type UserFormProps = {
  formTitle: string
  emailTitle: string
  emailHeader: string
  linkOnSuccess?: string
  prompts: Prompt[]
}

export const UserForm: FunctionComponent<UserFormProps> =
  ({ formTitle, emailTitle, emailHeader, prompts, linkOnSuccess }) => {
    const { loading, submit } = useFormService()

    return (
      <Form
        variant="paper"
        redirectOnSuccess={() => linkOnSuccess}
        loading={loading}
        submit={(map) => {
          const data = prompts.map(p => ({ key: p.key, value: map[p.key] }))
          return submit({ title: emailTitle, header: emailHeader, data })
        }}
      >
        <Typography variant="h2" flex="100%">{formTitle}</Typography>
        { prompts?.map((p, i) => {
          if (p.type === 'string') {
            return <TextFormField key={i} id={p.key} label={p.key} required={p.required} narrow={p.narrow} />
          } else if (p.type === 'number') {
            return <NumberFormField key={i} id={p.key} label={p.key} required={p.required} narrow={p.narrow} />
          } else {
            return <FormCheckboxes
                key={i}
                id={p.key}
                label={p.key}
                required={p.required}
                narrow={p.narrow}
                options={p.options?.split('\n')?.map(o => o.trim())?.filter(o => !!o) || []}
              />
          }
        })}
      </Form>
    )
  }

