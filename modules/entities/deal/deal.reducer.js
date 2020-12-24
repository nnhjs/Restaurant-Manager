import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dealRequest: ["dealId"],
  dealAllRequest: ["options"],
  createDealRequest: ["deal"],

  dealSuccess: ["deal"],
  dealAllSuccess: ["deals"],
  createDealSuccess: ["deal"],

  dealFailure: ["error"],
  dealAllFailure: ["error"],
  createDealFailure: ["error"],

  resetDeal: [],
});

export const DealTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  creating: null,
  deal: null,
  deals: [],
  errorOne: null,
  errorAll: null,
  errorCreate: null,
});

/* ------------- Reducers ------------- */

// request create
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    deal: null,
  });

// request create
export const requestAll = (state) =>
  state.merge({
    fetchingAll: true,
    errorAll: null,
  });

// request the data from an api
export const requestCreate = (state) =>
  state.merge({
    creating: true,
  });

// successful api lookup for single entity
export const success = (state, action) => {
  const { deal } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    deal,
  });
};

// successful api lookup for single entity
export const successAll = (state, action) => {
  const { deals } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    deals,
  });
};

// successful create
export const successCreate = (state, action) => {
  const { deal } = action;
  return state.merge({
    creating: false,
    errorCreate: null,
    deal,
  });
};

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    deal: null,
  });
};

// Something went wrong fetching a single entity.
export const failureAll = (state, action) => {
  const { error } = action;
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    deals: null,
  });
};

// Something went wrong create.
export const failureCreate = (state, action) => {
  const { error } = action;
  return state.merge({
    creating: false,
    errorCreate: error,
    deal: null,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.DEAL_REQUEST]: request,
  [Types.DEAL_ALL_REQUEST]: requestAll,
  [Types.CREATE_DEAL_REQUEST]: requestCreate,

  [Types.DEAL_SUCCESS]: success,
  [Types.DEAL_ALL_SUCCESS]: successAll,
  [Types.CREATE_DEAL_SUCCESS]: successCreate,

  [Types.DEAL_FAILURE]: failure,
  [Types.DEAL_ALL_FAILURE]: failureAll,
  [Types.CREATE_DEAL_FAILURE]: failureCreate,

  [Types.RESET_DEAL]: reset,
});
