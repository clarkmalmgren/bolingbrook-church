'use client'

import { Form, tryResponse } from '@/forms/Form'
import { TextFormField } from '@/forms/FormField'
import { FunctionComponent, useState } from 'react'
import { Section } from '@/components/Section'
import { Sermon } from '@/services/models/sermon'
import { saveSermon } from '@/services/SermonService'

const ImportSermons: FunctionComponent<{}> =
  ({}) => (
    <Section>
      <Form
        title="Import Sermons"
        variant="paper"
        submitText="Import"
        submit={(data) => tryResponse(async () => {
          const sermons: Sermon[] = Object.values(JSON.parse(data.json))
          for (let sermon of sermons) {
            await saveSermon(sermon)
          }
        })}
        redirectOnSuccess={() => '/admin'}
      >
        <TextFormField
          id="json"
          label="JSON"
          helperText="Only use if you really know what you are doing..." 
          multiline
        />
      </Form>
    </Section>
  )

export default ImportSermons
