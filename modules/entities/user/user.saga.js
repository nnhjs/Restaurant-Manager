import { call, put } from 'redux-saga/effects'
import UserActions from './user.reducer'
import { callApi } from '../../../share/sagas/call-api.saga'
import Toast from 'react-native-toast-message'
import LoginActions from "../../login/login.reducer";

export function* getUser(api, action) {
  const { userId } = action
  // make the call to the api
  const apiCall = call(api.getUser, userId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserActions.userSuccess(response.data))
  } else {
    yield put(UserActions.userFailure(response.data))
  }
}

export function* getUsers(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUsers, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserActions.userAllSuccess(response.data))
  } else {
    yield put(UserActions.userAllFailure(response.data))
  }
}

export function* createUsers(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.createUser, options)
  const response = yield call(callApi, apiCall)
  // success?
  if (response.ok) {
    yield put(UserActions.userCreateSuccess(response.data))
  } else {
    yield put(UserActions.userCreateFailure(response.data))
  }
}

export function* updateUser(api, action) {
  const { id, user } = action
  // make the call to the api
  const apiCall = call(api.updateUser, id, user)
  const response = yield call(callApi, apiCall)
  // success?
  if (response.ok) {
    Toast.show({
      text1: "Cập nhật tài khoản thành công 👋",
    });
    yield put(LoginActions.loginSuccess(response.data.data));
  } else {
    Toast.show({
      type: "error",
      text1: "Cập nhật tài khoản thất bại",
    });
    yield put(LoginActions.loginSuccess(response.data.data));
  }
}

export function* deleteUser(api, action) {
  const { userId } = action
  // make the call to the api
  const apiCall = call(api.deleteUser, userId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserActions.userDeleteSuccess())
  } else {
    yield put(UserActions.userDeleteFailure(response.data))
  }
}
