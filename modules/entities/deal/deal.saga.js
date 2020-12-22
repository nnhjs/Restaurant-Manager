import { call, put } from "redux-saga/effects";
import { callApi } from "../../../share/sagas/call-api.saga";
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

export function* createDeal(api, action) {
  const { deal } = action;
  // make the call to the api
  const apiCall = call(api.createDeal, deal);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(DealActions.createDealSuccess(response.data));
  } else {
    yield put(DealActions.createDealFailure(response.data));
  }
}
