import { LoopReducer } from "redux-loop"
import { Action } from "redux"

export type Selector<State, T> =
  ((state: State) => (...args: any[]) => T)

export type SelectorMap<State> = {
  [name: string]: Selector<State, any | undefined>
}

/**
 * Single interface that describes the entire and isolated behaviors of a reducer, its state,
 * and related selectors. By isolating like this, combining reducers becomes much easier and
 * conceptual understanding of 
 */
export interface Reduxer<State, Actions extends Action> {

  /**
   * Initial State
   */
  initialState: State

  /**
   * The actual Reducer
   */
  reducer: LoopReducer<State, Actions>

  /**
   * All the selectors using local state
   */
  selectors: SelectorMap<State>

}