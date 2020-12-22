import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cartAdd: ["item"],
  cartSubtract: ["item"],
});

export const CartTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  carts: [],
});

/* ------------- Reducers ------------- */

// Something went wrong deleting.
export const add = (state, action) => {
  const { item } = action;
  const newCarts = [item, ...state.carts];
  return state.merge({
    carts: newCarts,
  });
};

// Something went wrong deleting.
export const subtract = (state, action) => {
  const { item } = action;
  const index = state.carts.findIndex((ele) => ele._id === item._id);
  const newCarts = [
    ...state.carts.slice(0, index),
    ...state.carts.slice(index + 1),
  ];
  return state.merge({
    carts: newCarts,
  });
};

export const reset = (state) => INITIAL_STATE;

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CART_ADD]: add,

  [Types.CART_SUBTRACT]: subtract,
});
