import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  cartAdd: ['cartId'],
  cartSubtract: ['cartId'],
})

export const CartTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  carts: [],
})

/* ------------- Reducers ------------- */

// Something went wrong deleting.
export const add = (state, action) => {
  const { cartId } = action
  return state.merge({
    carts: state.carts,
  })
}

// Something went wrong deleting.
export const subtract = (state, action) => {
  const { cartId } = action
  return state.merge({
    cart: state.cart,
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CART_ADD]: add,
  
  [Types.CART_SUBTRACT]: subtract,
})
