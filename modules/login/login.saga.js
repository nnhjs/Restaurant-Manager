import Toast from "react-native-toast-message";
import { call, put, select } from "redux-saga/effects";
import AccountActions from "../../share/reducers/account.reducer";
import LoginActions from "./login.reducer";

export const selectAuthToken = (state) => state.login.authToken;
// attempts to login
export function* login(api, { username, password }) {
  const authObj = {
    username: username,
    password: password,
  };

  const response = yield call(api.login, authObj);

  // success?
  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data.data[0]));
    Toast.show({
      text1: "Đăng nhập thành công 👋",
    });
  } else {
    yield put(
      LoginActions.loginFailure(
        (response.data && response.data.detail) || "Bad credentials"
      )
    );
    Toast.show({
      type: "error",
      text1: "Đăng nhập thất bại",
    });
  }
}
// attempts to logout
export function* logout(api) {
  yield call(api.removeAuthToken);
  yield put(AccountActions.accountRequest());
  yield put(LoginActions.logoutSuccess());
  yield put({ type: "RELOGIN_ABORT" });
}
// loads the login
export function* loginLoad(api) {
  const authToken = yield select(selectAuthToken);
  // only set the token if we have it
  if (authToken) {
    yield call(api.setAuthToken, authToken);
  }
  yield put(LoginActions.loginLoadSuccess());
}
