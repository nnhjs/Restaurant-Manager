import { call, put } from "redux-saga/effects";
import { callApi } from "../../../share/sagas/call-api.saga";
import HotelActions from "./hotel.reducer";

export function* getHotel(api, action) {
  const { hotelId } = action;
  // make the call to the api
  const apiCall = call(api.getHotel, hotelId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HotelActions.hotelSuccess(response.data));
  } else {
    yield put(HotelActions.hotelFailure(response.data));
  }
}

export function* getHotels(api, action) {
  const { options } = action;
  // make the call to the api
  const apiCall = call(api.getHotels, options);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HotelActions.hotelAllSuccess(response.data));
  } else {
    yield put(HotelActions.hotelAllFailure(response.data));
  }
}

export function* updateHotel(api, action) {
  const { hotel } = action;
  // make the call to the api
  const idIsNotNull = !!hotel.id;
  const apiCall = call(idIsNotNull ? api.updateHotel : api.createHotel, hotel);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HotelActions.hotelUpdateSuccess(response.data));
  } else {
    yield put(HotelActions.hotelUpdateFailure(response.data));
  }
}

export function* deleteHotel(api, action) {
  const { hotelId } = action;
  // make the call to the api
  const apiCall = call(api.deleteHotel, hotelId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(HotelActions.hotelDeleteSuccess());
  } else {
    yield put(HotelActions.hotelDeleteFailure(response.data));
  }
}
