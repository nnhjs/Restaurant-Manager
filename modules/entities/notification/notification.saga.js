import { call, put } from 'redux-saga/effects'
import NotificationActions from './notification.reducer'
import { callApi } from '../../../share/sagas/call-api.saga'

export function* getNotification(api, action) {
  const { notificationId } = action
  // make the call to the api
  const apiCall = call(api.getNotification, notificationId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(NotificationActions.notificationSuccess(response.data))
  } else {
    yield put(NotificationActions.notificationFailure(response.data))
  }
}

export function* getNotifications(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getNotifications, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(NotificationActions.notificationAllSuccess(response.data.data))
  } else {
    yield put(NotificationActions.notificationAllFailure(response.data))
  }
}

export function* updateNotification(api, action) {
  const { notification } = action
  // make the call to the api
  const idIsNotNull = !!notification.id
  const apiCall = call(idIsNotNull ? api.updateNotification : api.createNotification, notification)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(NotificationActions.notificationUpdateSuccess(response.data))
  } else {
    yield put(NotificationActions.notificationUpdateFailure(response.data))
  }
}

export function* deleteNotification(api, action) {
  const { notificationId } = action
  // make the call to the api
  const apiCall = call(api.deleteNotification, notificationId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(NotificationActions.notificationDeleteSuccess())
  } else {
    yield put(NotificationActions.notificationDeleteFailure(response.data))
  }
}
