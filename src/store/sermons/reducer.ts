import { ParseAction, parse, SermonActions, LOAD, PARSE } from './actions'
import { loop, Cmd, LoopReducer } from 'redux-loop';
import { Sermon } from '../../models/sermon'
import { fetchSermons } from './effects' 

export interface State {
  loading: boolean
  sermons: Sermon[]
}

export const initialState: State = {
  loading: false,
  sermons: []
}

export const reducer: LoopReducer<State, SermonActions> =
  (state: State = initialState, action: SermonActions) => {
    switch(action.type) {
      case LOAD:
        return loop(
          { ...state, loading: true },
          Cmd.run(fetchSermons, { successActionCreator: parse })
        )

      case PARSE:
        return {
          loading: false,
          sermons: (action as ParseAction).sermons
        }
        
      default:
        return state
    }
  }


