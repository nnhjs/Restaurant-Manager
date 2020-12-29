import { all, takeLatest } from "redux-saga/effects";
import { DealTypes } from "../../modules/entities/deal/deal.reducer";
import {
  createDeal,
  getDeal,
  getDeals,
} from "../../modules/entities/deal/deal.saga";
import { FoodTypes } from "../../modules/entities/food/food.reducer";
import { getFood, getFoods } from "../../modules/entities/food/food.saga";
import { HotelTypes } from "../../modules/entities/hotel/hotel.reducer";
import { getHotel, getHotels } from "../../modules/entities/hotel/hotel.sagas";
import { NotificationTypes } from "../../modules/entities/notification/notification.reducer";
import {
  deleteNotification,
  getNotification,
  getNotifications,
  updateNotification,
} from "../../modules/entities/notification/notification.saga";
import { RestaurantTypes } from "../../modules/entities/restaurant/restaurant.reducer";
import {
  getRestaurant,
  getRestaurants,
} from "../../modules/entities/restaurant/restaurant.saga";
import { UserTypes } from "../../modules/entities/user/user.reducer";
import { createUsers, updateUser } from "../../modules/entities/user/user.saga";
/* ------------- Types ------------- */
// import { NewsTypes } from '../../modules/entities/news/news.reducer' -- data maaux
import { LoginTypes } from "../../modules/login/login.reducer";
// ignite-jhipster-saga-redux-import-needle
/* ------------- Sagas ------------- */
import { login } from "../../modules/login/login.saga";
import API from "../services/api";

// ignite-jhipster-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(UserTypes.USER_CREATE_REQUEST, createUsers, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, updateUser, api),
    takeLatest(NotificationTypes.NOTIFICATION_REQUEST, getNotification, api),
    takeLatest(
      NotificationTypes.NOTIFICATION_ALL_REQUEST,
      getNotifications,
      api
    ),
    takeLatest(
      NotificationTypes.NOTIFICATION_UPDATE_REQUEST,
      updateNotification,
      api
    ),
    takeLatest(
      NotificationTypes.NOTIFICATION_DELETE_REQUEST,
      deleteNotification,
      api
    ),

    takeLatest(RestaurantTypes.RESTAURANT_REQUEST, getRestaurant, api),
    takeLatest(RestaurantTypes.RESTAURANT_ALL_REQUEST, getRestaurants, api),

    takeLatest(FoodTypes.FOOD_REQUEST, getFood, api),
    takeLatest(FoodTypes.FOOD_ALL_REQUEST, getFoods, api),

    takeLatest(HotelTypes.HOTEL_REQUEST, getHotel, api),
    takeLatest(HotelTypes.HOTEL_ALL_REQUEST, getHotels, api),

    takeLatest(DealTypes.DEAL_REQUEST, getDeal, api),
    takeLatest(DealTypes.DEAL_ALL_REQUEST, getDeals, api),
    takeLatest(DealTypes.CREATE_DEAL_REQUEST, createDeal, api),
  ]);
}
