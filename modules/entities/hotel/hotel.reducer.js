import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  hotelRequest: ["hotelId"],
  hotelAllRequest: ["options"],
  hotelUpdateRequest: ["hotel"],
  hotelDeleteRequest: ["hotelId"],

  hotelSuccess: ["hotel"],
  hotelAllSuccess: ["hotels"],
  hotelUpdateSuccess: ["hotel"],
  hotelDeleteSuccess: [],

  hotelFailure: ["error"],
  hotelAllFailure: ["error"],
  hotelUpdateFailure: ["error"],
  hotelDeleteFailure: ["error"],
});

export const HotelTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  deleting: null,
  hotel: null,
  hotels: null,
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorDeleting: null,
});

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    hotel: null,
  });

// request the data from an api
export const allRequest = (state) =>
  state.merge({
    fetchingAll: true,
    hotels: null,
  });

// request to update from an api
export const updateRequest = (state) =>
  state.merge({
    updating: true,
  });
// request to delete from an api
export const deleteRequest = (state) =>
  state.merge({
    deleting: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { hotel } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    hotel,
  });
};
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { hotels } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    hotels,
  });
};
// successful api update
export const updateSuccess = (state, action) => {
  const { hotel } = action;
  return state.merge({
    updating: false,
    errorUpdating: null,
    hotel,
  });
};
// successful api delete
export const deleteSuccess = (state) => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    hotel: null,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    hotel: null,
  });
};
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    hotels: null,
  });
};
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    updating: false,
    errorUpdating: error,
    hotel: state.hotel,
  });
};
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action;
  return state.merge({
    deleting: false,
    errorDeleting: error,
    hotel: state.hotel,
  });
};

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.HOTEL_REQUEST]: request,
  [Types.HOTEL_ALL_REQUEST]: allRequest,
  [Types.HOTEL_UPDATE_REQUEST]: updateRequest,
  [Types.HOTEL_DELETE_REQUEST]: deleteRequest,

  [Types.HOTEL_SUCCESS]: success,
  [Types.HOTEL_ALL_SUCCESS]: allSuccess,
  [Types.HOTEL_UPDATE_SUCCESS]: updateSuccess,
  [Types.HOTEL_DELETE_SUCCESS]: deleteSuccess,

  [Types.HOTEL_FAILURE]: failure,
  [Types.HOTEL_ALL_FAILURE]: allFailure,
  [Types.HOTEL_UPDATE_FAILURE]: updateFailure,
  [Types.HOTEL_DELETE_FAILURE]: deleteFailure,
});
