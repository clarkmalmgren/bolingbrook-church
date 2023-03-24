import moment from 'moment'
import { FunctionComponent, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { ErrorDialog } from '../components/error'
import { Form, List, Submit, TextField } from '../forms'
import { PartialSermon } from '../models/sermon'
import { useSaveSermon, useSermon } from '../services/sermon'
import { SecurePage } from './secure-page'

type BaseEditSermonProps = {
  disableDate?: boolean
  initialData?: PartialSermon
}

function isValid(data: PartialSermon): boolean {
  return !!data.date &&
    !!data.title &&
    !!data.services &&
    data.services.length > 0 &&
    !data.services.find((s: any) => !s.identifier || !s.start || !s.youtube)
}

export const BaseEditSermon: FunctionComponent<BaseEditSermonProps> =
  ({ disableDate, initialData }) => {
    const [ submitted, setSubmitted ] = useState(false)
    const [ failed, setFailed ] = useState(false)
    const [ sumbittable, setSumbittable ] = useState(isValid(initialData || {}))
    const save = useSaveSermon()

    const changed = (data: any) => { setSumbittable(isValid(data as PartialSermon)) }

    const submit = (data: any) => {
      save(data)
        .then(() => setSubmitted(true))
        .catch(() => setFailed(true))
    }

    return submitted ?
      (<Navigate to="/admin/sermons" />) :
      (
        <SecurePage>
          <Form onChange={changed} onSubmit={submit} initialData={initialData}>
            <TextField required id="date" dataType="date" disabled={disableDate}>Date</TextField>
            <TextField required id="title">Title</TextField>
            <TextField id="series">Series</TextField>
            <TextField id="speaker">Speaker</TextField>
            <TextField id="description" multiline>Description</TextField>

            <List id="services" title="Services">
              <TextField required id="identifier">Identifier</TextField>
              <TextField required id="start" dataType="time">Start</TextField>
              <TextField required id="youtube">Youtube ID</TextField>
            </List>

            <Submit disabled={!sumbittable}>Submit</Submit>
          </Form>

          <ErrorDialog open={failed} onClose={() => setFailed(false)} />
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
