import { call, put } from 'redux-saga/effects'
import RestaurantActions from './restaurant.reducer'
import { callApi } from '../../../share/sagas/call-api.saga'

export function* getRestaurant(api, action) {
  const { restaurantId } = action
  // make the call to the api
  const apiCall = call(api.getRestaurant, restaurantId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    console.log(response)
    yield put(RestaurantActions.restaurantSuccess(response.data))
  } else {
    yield put(RestaurantActions.restaurantFailure(response.data))
  }
}

export function* getRestaurants(api, action) {
  const { options } = action
  // console.log('options', options)
  // make the call to the api
  const apiCall = call(api.getRestaurants, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    // console.log('response: ', response);
    yield put(RestaurantActions.restaurantAllSuccess(response.data))
  } else {
    yield put(RestaurantActions.restaurantAllFailure(response.data))
  }
}

export function* updateRestaurant(api, action) {
  const { restaurant } = action
  // make the call to the api
  const idIsNotNull = !!restaurant.id
  const apiCall = call(idIsNotNull ? api.updateRestaurant : api.createRestaurant, restaurant)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(RestaurantActions.restaurantUpdateSuccess(response.data))
  } else {
    yield put(RestaurantActions.restaurantUpdateFailure(response.data))
  }
}

export function* deleteRestaurant(api, action) {
  const { restaurantId } = action
  // make the call to the api
  const apiCall = call(api.deleteRestaurant, restaurantId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(RestaurantActions.restaurantDeleteSuccess())
  } else {
    yield put(RestaurantActions.restaurantDeleteFailure(response.data))
  }
}
