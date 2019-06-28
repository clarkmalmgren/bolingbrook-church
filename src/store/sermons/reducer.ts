import { ParseAction, parse, SermonActions, LOAD, PARSE } from './actions'
import moment from 'moment'
import { loop, Cmd, LoopReducer } from 'redux-loop';
import { Sermon } from '../../models/sermon'
import { fetchSermons } from './effects'
import { Reduxer } from '../reduxer'

function now(): moment.Moment { return moment() }

function ageInMinutes(m: moment.Moment): number {
  return now().diff(m) / 1000 / 60
}

export interface State {
  loading: boolean
  sermons: Sermon[]
  lastLoad?: moment.Moment
}

const initialState: State = {
  loading: false,
  sermons: []
}

export class SermonReduxer implements Reduxer<State, SermonActions> {

  initialState = initialState

  reducer(state: State = initialState, action: SermonActions) {
    switch(action.type) {
      case LOAD:
        if (!state.lastLoad || ageInMinutes(state.lastLoad) > 10) {
          return loop(
            { ...state, loading: true },
            Cmd.run(fetchSermons, { successActionCreator: parse })
          )
        } else {
          return state
        }

      case PARSE:
        return {
          loading: false,
          sermons: (action as ParseAction).sermons
        }
        
      default:
        return state
    }
  }

  selectors = {

    current: (state: State) => () => {
      const today = moment().startOf('day')
      return state
        .sermons
        .find(s => moment(s.date).isSameOrBefore(today))
    },

    date: (state: State) => (date: string) => (
      state.sermons.find(s => s.date == date)
    ),

    all: (state: State) => () => state.sermons

  }
}

