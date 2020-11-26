import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  restaurantRequest: ['restaurantId'],
  restaurantAllRequest: ['options'],
  restaurantUpdateRequest: ['restaurant'],
  restaurantDeleteRequest: ['restaurantId'],

  restaurantSuccess: ['restaurant'],
  restaurantAllSuccess: ['restaurants'],
  restaurantUpdateSuccess: ['restaurant'],
  restaurantDeleteSuccess: [],

  restaurantFailure: ['error'],
  restaurantAllFailure: ['error'],
  restaurantUpdateFailure: ['error'],
  restaurantDeleteFailure: ['error'],
})

export const RestaurantTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  restaurant: null,
  restaurants: null,
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
    restaurant: null,
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    restaurants: null,
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
  const { restaurant } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    restaurant,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { restaurants } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    restaurants,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { restaurant } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    restaurant,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    restaurant: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    restaurant: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    restaurants: null,
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    restaurant: state.restaurant,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    restaurant: state.restaurant,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.RESTAURANT_REQUEST]: request,
  [Types.RESTAURANT_ALL_REQUEST]: allRequest,
  [Types.RESTAURANT_UPDATE_REQUEST]: updateRequest,
  [Types.RESTAURANT_DELETE_REQUEST]: deleteRequest,

  [Types.RESTAURANT_SUCCESS]: success,
  [Types.RESTAURANT_ALL_SUCCESS]: allSuccess,
  [Types.RESTAURANT_UPDATE_SUCCESS]: updateSuccess,
  [Types.RESTAURANT_DELETE_SUCCESS]: deleteSuccess,

  [Types.RESTAURANT_FAILURE]: failure,
  [Types.RESTAURANT_ALL_FAILURE]: allFailure,
  [Types.RESTAURANT_UPDATE_FAILURE]: updateFailure,
  [Types.RESTAURANT_DELETE_FAILURE]: deleteFailure,
})
