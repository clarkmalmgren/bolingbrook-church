import { combineReducers } from 'redux-loop'
import { SelectorMap } from './reduxer'
import { SermonReduxer } from './sermons/reducer'

const sermons = new SermonReduxer()

export const rootReducer = combineReducers({
  sermons: sermons.reducer
})

export const rootInitialState = {
  sermons: sermons.initialState
}

function map<SM extends SelectorMap<any>>(key: string, selectorMap: SM): SM {
  return Object.keys(selectorMap)
    .reduce((map: any, name: string) => {
      const baseSelector = selectorMap[name]
      map[name] = (state: any) => baseSelector(state[key])
      return map
    }, {}) as SM
}

export const sermonSelectors = map('sermons', sermons.selectors)
