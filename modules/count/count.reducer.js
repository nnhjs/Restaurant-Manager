import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  countAdd: [],
  countSubtract: [],
})

export const CountTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  counts: 0,
})

/* ------------- Reducers ------------- */

// Something went wrong deleting.
export const add = (state) => {

  return state.merge({
    counts: state.counts + 1,
  })
}

// Something went wrong deleting.
export const subtract = (state) => {
  return state.merge({
    count: state.count - 1,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.COUNT_ADD]: add,
  
  [Types.COUNT_SUBTRACT]: subtract,
})
