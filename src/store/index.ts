import { combineReducers } from 'redux-loop'
import { SelectorMap } from './reduxer'
import { SermonReduxer } from './sermons/reducer'
import { AuthReduxer } from './auth/reducer'

const sermons = new SermonReduxer()
const auth = new AuthReduxer()

// Maps the selectors
function map<SM extends SelectorMap<any>>(key: string, selectorMap: SM): SM {
  return Object.keys(selectorMap)
    .reduce((map: any, name: string) => {
      const baseSelector = selectorMap[name]
      map[name] = (state: any) => baseSelector(state[key])
      return map
    }, {}) as SM
}

export const rootReducer = combineReducers({
  sermons: sermons.reducer,
  auth: auth.reducer
})

export const rootInitialState = {
  sermons: sermons.initialState,
  auth: auth.reducer
}

export const sermonSelectors = map('sermons', sermons.selectors)
export const authSelectors = map('auth', auth.selectors)
