import { combineReducers } from 'redux'

import configureStore from './create-store'
import rootSaga from '../sagas'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,

  notifications: require('../../modules/entities/notification/notification.reducer').reducer,
  restaurants: require('../../modules/entities/restaurant/restaurant.reducer').reducer,
  foods: require('../../modules/entities/food/food.reducer').reducer,
  cart: require('../../modules/entities/cart/cart.reducer').reducer,
})

export default () => {
  let finalReducers = reducers

  let { store, sagasManager, sagaMiddleware } = configureStore(finalReducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
