import React from 'react'

const TICK: String = "TICK"

export interface TickAction {
  type: typeof TICK
}

export type Actions = TickAction

export interface State {
  counter: number
}

const initialState: State = { counter: 1 }

export function reducer(state: State = initialState, action: Actions): State {
  switch(action.type) {
    case TICK:
      return {
        ...state,
        counter: state.counter + 1
      }
    default:
      return { ...state }
  }
}
