import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  notificationRequest: ['notificationId'],
  notificationAllRequest: ['options'],
  notificationUpdateRequest: ['notification'],
  notificationDeleteRequest: ['notificationId'],

  notificationSuccess: ['notification'],
  notificationAllSuccess: ['notifications'],
  notificationUpdateSuccess: ['notification'],
  notificationDeleteSuccess: [],

  notificationFailure: ['error'],
  notificationAllFailure: ['error'],
  notificationUpdateFailure: ['error'],
  notificationDeleteFailure: ['error'],
})

export const NotificationTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  notification: null,
  notifications: [],
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
    notification: null,
  })

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    notifications: null,
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
  const { notification } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    notification,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { notifications } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    notifications,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { notification } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    notification,
  })
}
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    notification: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    notification: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    notifications: null,
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    notification: state.notification,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    notification: state.notification,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.NOTIFICATION_REQUEST]: request,
  [Types.NOTIFICATION_ALL_REQUEST]: allRequest,
  [Types.NOTIFICATION_UPDATE_REQUEST]: updateRequest,
  [Types.NOTIFICATION_DELETE_REQUEST]: deleteRequest,

  [Types.NOTIFICATION_SUCCESS]: success,
  [Types.NOTIFICATION_ALL_SUCCESS]: allSuccess,
  [Types.NOTIFICATION_UPDATE_SUCCESS]: updateSuccess,
  [Types.NOTIFICATION_DELETE_SUCCESS]: deleteSuccess,

  [Types.NOTIFICATION_FAILURE]: failure,
  [Types.NOTIFICATION_ALL_FAILURE]: allFailure,
  [Types.NOTIFICATION_UPDATE_FAILURE]: updateFailure,
  [Types.NOTIFICATION_DELETE_FAILURE]: deleteFailure,
})
