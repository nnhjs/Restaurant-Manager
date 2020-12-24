import Toast from "react-native-toast-message";
import { call, put } from "redux-saga/effects";
import { callApi } from "../../../share/sagas/call-api.saga";
import CartActions from "../cart/cart.reducer";
import DealActions from "./deal.reducer";

export function* getDeal(api, action) {
  const { dealId } = action;
  // make the call to the api
  const apiCall = call(api.getDeal, dealId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DealActions.dealSuccess(response.data));
  } else {
    yield put(DealActions.dealFailure(response.data));
  }
}

export function* getDeals(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getDeals, options);
  const response = yield call(callApi, apiCall);
  // success?
  if (response.ok) {
    yield put(DealActions.dealAllSuccess(response.data.data));
  } else {
    yield put(DealActions.dealAllFailure(response.data));
  }
}

export function* createDeal(api, action) {
  const { deal } = action;
  // make the call to the api
  const apiCall = call(api.createDeal, deal);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DealActions.createDealSuccess(response.data));
    yield put(DealActions.dealAllRequest({ id_account: deal?.id_account }));
    yield put(CartActions.cartReset());
    Toast.show({
      text1: "Thanh toán thành công",
      text2: "Cảm ơn bạn đã tin tưởng 👋",
    });
  } else {
    yield put(DealActions.createDealFailure(response.data));
    Toast.show({
      text1: "Thanh toán thất bại",
      text2: "Hãy thử lại xem sao nhé .",
    });
  }
}
