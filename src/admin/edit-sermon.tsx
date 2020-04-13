import React from 'react'
import moment from 'moment'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { match, Redirect } from 'react-router'
import { SecurePage } from './secure-page'
import { Form, TextField, List, Submit } from '../forms'
import { sermonSelectors } from '../store/index'
import { load, refresh } from '../store/sermons/actions'
import { PartialSermon } from '../models/sermon'
import { save } from '../services/sermon'
import { ErrorDialog } from '../components/error'

interface MatchParams { id: string }

interface EditSermonProps {
  disableDate: boolean
  onLoad: () => void
  refresh: () => void
  match: match<MatchParams>
  initialData?: PartialSermon
}

interface EditSermonState {
  data: PartialSermon
  submitted: boolean
  failed: boolean
}

export class BaseEditSermon extends React.PureComponent<EditSermonProps, EditSermonState> {

  static defaultProps: Partial<EditSermonProps> = { disableDate: true }

  state = {
    data: this.props.initialData || {},
    submitted: false,
    failed: false
  }

  componentDidMount() {
    this.props.onLoad()
  }

  submit = (data: any) => {
    save(data)
      .then(() => this.props.refresh())
      .then(() => this.setState({ submitted: true }))
      .catch(() => this.setState({ failed: true }))
  }

  render() {
    return this.state.submitted ?
      (<Redirect to="/admin/sermons" />) :
      (
        <SecurePage>
          <Form onSubmit={this.submit} initialData={this.props.initialData}>
            <TextField id="date" dataType="date" disabled={this.props.disableDate}>Date</TextField>
            <TextField id="title">Title</TextField>
            <TextField id="series">Series</TextField>
            <TextField id="speaker">Speaker</TextField>
            <TextField id="description" multiline>Description</TextField>

            <List id="services" title="Services">
              <TextField id="identifier">Identifier</TextField>
              <TextField id="start" dataType="time">Start</TextField>
              <TextField id="youtube">Youtube ID</TextField>
            </List>

            <Submit>Submit</Submit>
          </Form>

          <ErrorDialog open={this.state.failed} onClose={() => this.setState({ failed: false })} />
        </SecurePage>
      ) 
  }
}

const mapStateToProps = (state: any, ownProps: EditSermonProps) => {
  const data = sermonSelectors.date(state)(ownProps.match.params.id)
  return ({ initialData: data })
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  ({
    onLoad: () => dispatch(load()),
    refresh: () => dispatch(refresh())
  })

export const EditSermon = connect(mapStateToProps, mapDispatchToProps)(BaseEditSermon)

const mapStateToPropsForNew = (state: any) => (
  {
    initialData: {
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
    },
    disableDate: false
  })

export const NewSermon = connect(mapStateToPropsForNew, mapDispatchToProps)(BaseEditSermon)