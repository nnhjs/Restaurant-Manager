import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  dealRequest: ["dealId"],
  createDealRequest: ["deal"],

  dealSuccess: ["deal"],
  createDealSuccess: ["deal"],

  dealFailure: ["error"],
  createDealFailure: ["error"],

  reset: [],
});

export const DealTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  creating: null,
  deal: null,
  errorOne: null,
  errorCreate: null,
});

/* ------------- Reducers ------------- */

// request create
export const request = (state) =>
  state.merge({
    fetchingOne: true,
    deal: null,
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
  [Types.CREATE_DEAL_REQUEST]: requestCreate,

  [Types.DEAL_SUCCESS]: success,
  [Types.CREATE_DEAL_SUCCESS]: successCreate,

  [Types.DEAL_FAILURE]: failure,
  [Types.CREATE_DEAL_FAILURE]: failureCreate,

  [Types.RESET]: reset,
});
