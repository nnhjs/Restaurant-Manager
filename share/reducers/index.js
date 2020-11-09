import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'

import configureStore from './create-store'
import rootSaga from '../sagas'
import ReduxPersist from '../../config/redux-persist'

/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  appState: require('./app-state.reducer').reducer,
  users: require('./user.reducer').reducer,
  news: require('../../modules/entities/news/news.reducer').reducer,
  facilities: require('../../modules/entities/facility/facility.reducer').reducer,
  facilityTypes: require('../../modules/entities/facility-type/facility-type.reducer').reducer,
  licenses: require('../../modules/entities/license/license.reducer').reducer,
  idPapers: require('../../modules/entities/id-paper/id-paper.reducer').reducer,
  idPaperTypes: require('../../modules/entities/id-paper-type/id-paper-type.reducer').reducer,
  notifications: require('../../modules/entities/notification/notification.reducer').reducer,
  investigations: require('../../modules/entities/investigation/investigation.reducer').reducer,
  investicationFacilityAssociations: require('../../modules/entities/investication-facility-association/investication-facility-association.reducer')
    .reducer,
  investicationUserAssociations: require('../../modules/entities/investication-user-association/investication-user-association.reducer')
    .reducer,
  products: require('../../modules/entities/product/product.reducer').reducer,
  productTypes: require('../../modules/entities/product-type/product-type.reducer').reducer,
  files: require('../../modules/entities/file/file.reducer').reducer,
  feedbacks: require('../../modules/entities/feedback/feedback.reducer').reducer,
  contributeReports: require('../../modules/entities/contribute-report/contribute-report.reducer').reducer,
  addresses: require('../../modules/entities/address/address.reducer').reducer,
  departments: require('../../modules/entities/department/department.reducer').reducer,
  positions: require('../../modules/entities/position/position.reducer').reducer,
  permisions: require('../../modules/entities/permision/permision.reducer').reducer,
  reports: require('../../modules/entities/report/report.reducer').reducer,
  systemLogs: require('../../modules/entities/system-logs/system-logs.reducer').reducer,
  // ignite-jhipster-redux-store-import-needle
  account: require('./account.reducer').reducer,
  login: require('../../modules/login/login.reducer').reducer,
  register: require('../../modules/account/register/register.reducer').reducer,
  changePassword: require('../../modules/account/password/change-password.reducer').reducer,
  forgotPassword: require('../../modules/account/password-reset/forgot-password.reducer').reducer,
})

export default () => {
  let finalReducers = reducers
  // If rehydration is on use persistReducer otherwise default combineReducers
  if (ReduxPersist.active) {
    const persistConfig = ReduxPersist.storeConfig
    finalReducers = persistReducer(persistConfig, reducers)
  }

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
