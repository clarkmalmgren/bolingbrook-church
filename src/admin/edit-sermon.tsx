import moment from 'moment'
import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Form, List, Submit, TextField } from '../forms'
import { PartialSermon } from '../models/sermon'
import { useSaveSermon, useSermon } from '../services/sermon'
import { SecurePage } from './secure-page'

type BaseEditSermonProps = {
  disableDate?: boolean
  initialData?: PartialSermon
}

export const BaseEditSermon: FunctionComponent<BaseEditSermonProps> =
  ({ disableDate, initialData }) => {
    const save = useSaveSermon()

    return (
      <SecurePage>
        <Form onSubmit={save} defaultValues={initialData}>
          <TextField required name="date" type="date" disabled={disableDate} label="Date" />
          <TextField required name="title" label="Title" />
          <TextField name="series" label="Series" />
          <TextField name="speaker" label="Speaker" />
          <TextField name="description" multiline label="Description" />

          <List name="services" title="Services" >
            <TextField required name="identifier" label="Identifier" />
            <TextField required name="start" type="time" label="Start" />
            <TextField required name="youtube" label="YoutubeID" />
          </List>

          <Submit>Submit</Submit>
        </Form>
      </SecurePage>
    ) 
  }

export const EditSermon: FunctionComponent<{ id: string }> =
  ({ id }) => {
    const initialData = useSermon(id).value
    return initialData ? <BaseEditSermon initialData={initialData} disableDate /> : null
  }

export const EditSermonFromPath: FunctionComponent<{}> =
  () => {
    const { id }  = useParams()
    return id ? <EditSermon id={id} /> : null
  }

const NewInitialData: PartialSermon = {
  date: moment().startOf('week').add(6, 'd').format('YYYY-MM-DD'),
  services: [
    {
      identifier: "Morning",
      start: "10:30:00"
    },
    {
      identifier: "Afternoon",
      start: "12:30:00"
    },
  ]
}

export const NewSermon: FunctionComponent<{}> =
  () => (<BaseEditSermon initialData={NewInitialData} />)
