import { call, put } from "redux-saga/effects";
import { callApi } from "../../../share/sagas/call-api.saga";
import FoodActions from "./food.reducer";

export function* getFood(api, action) {
  const { foodId } = action;
  // make the call to the api
  const apiCall = call(api.getFood, foodId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    console.log(response);
    yield put(FoodActions.foodSuccess(response.data));
  } else {
    yield put(FoodActions.foodFailure(response.data));
  }
}

export function* getFoods(api, action) {
  const { options } = action;
  console.log("options", options);
  // console.log('options', options)
  // make the call to the api
  const apiCall = call(
    options?.typeFood || options?.id_restaurant
      ? api.getFoods
      : api.getFoodsFind,
    options
  );
  const response = yield call(callApi, apiCall);
  console.log("response", response);
  // success?
  if (response.ok) {
    // console.log('response: ', response);
    yield put(FoodActions.foodAllSuccess(response.data));
  } else {
    yield put(FoodActions.foodAllFailure(response.data));
  }
}

export function* updateFood(api, action) {
  const { food } = action;
  // make the call to the api
  const idIsNotNull = !!food.id;
  const apiCall = call(idIsNotNull ? api.updateFood : api.createFood, food);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FoodActions.foodUpdateSuccess(response.data));
  } else {
    yield put(FoodActions.foodUpdateFailure(response.data));
  }
}

export function* deleteFood(api, action) {
  const { foodId } = action;
  // make the call to the api
  const apiCall = call(api.deleteFood, foodId);
  const response = yield call(callApi, apiCall);

  // success?
  if (response.ok) {
    yield put(FoodActions.foodDeleteSuccess());
  } else {
    yield put(FoodActions.foodDeleteFailure(response.data));
  }
}
