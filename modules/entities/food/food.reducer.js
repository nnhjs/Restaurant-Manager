import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  foodRequest: ['foodId'],
  foodAllRequest: ['options'],
  foodUpdateRequest: ['food'],
  foodDeleteRequest: ['foodId'],

  foodSuccess: ['food'],
  foodAllSuccess: ['foods'],
  foodUpdateSuccess: ['food'],
  foodDeleteSuccess: [],

  foodFailure: ['error'],
  foodAllFailure: ['error'],
  foodUpdateFailure: ['error'],
  foodDeleteFailure: ['error'],
})

export const FoodTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  food: null,
  foods: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    food: null,
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    foods: null,
  })

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true,
  })
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { food } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    food,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { foods } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    foods,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { food } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    food,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    food: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    food: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    foods: null,
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    food: state.food,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    food: state.food,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FOOD_REQUEST]: request,
  [Types.FOOD_ALL_REQUEST]: allRequest,
  [Types.FOOD_UPDATE_REQUEST]: updateRequest,
  [Types.FOOD_DELETE_REQUEST]: deleteRequest,

  [Types.FOOD_SUCCESS]: success,
  [Types.FOOD_ALL_SUCCESS]: allSuccess,
  [Types.FOOD_UPDATE_SUCCESS]: updateSuccess,
  [Types.FOOD_DELETE_SUCCESS]: deleteSuccess,

  [Types.FOOD_FAILURE]: failure,
  [Types.FOOD_ALL_FAILURE]: allFailure,
  [Types.FOOD_UPDATE_FAILURE]: updateFailure,
  [Types.FOOD_DELETE_FAILURE]: deleteFailure,
})
