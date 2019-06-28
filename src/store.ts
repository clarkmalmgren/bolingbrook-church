import { createStore } from 'redux'
import { install, StoreCreator } from 'redux-loop';
import { rootReducer } from './store/index'

export default (createStore as StoreCreator)(rootReducer, undefined as any, install())
