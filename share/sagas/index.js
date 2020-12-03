import { takeLatest, all } from 'redux-saga/effects'
import API from '../services/api'

/* ------------- Types ------------- */

// import { NewsTypes } from '../../modules/entities/news/news.reducer' -- data maaux
import { LoginTypes } from '../../modules/login/login.reducer'
import { UserTypes } from '../../modules/entities/user/user.reducer'
import { NotificationTypes } from '../../modules/entities/notification/notification.reducer'
import { RestaurantTypes } from '../../modules/entities/restaurant/restaurant.reducer'
import { FoodTypes } from '../../modules/entities/food/food.reducer'

// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */
import { login } from '../../modules/login/login.saga'
import { createUsers } from '../../modules/entities/user/user.saga'
import { getNotification, getNotifications, updateNotification, deleteNotification } from '../../modules/entities/notification/notification.saga'
import { getRestaurant, getRestaurants, } from '../../modules/entities/restaurant/restaurant.saga'
import { getFood, getFoods } from '../../modules/entities/food/food.saga'
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

    takeLatest(NotificationTypes.NOTIFICATION_REQUEST, getNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_ALL_REQUEST, getNotifications, api),
    takeLatest(NotificationTypes.NOTIFICATION_UPDATE_REQUEST, updateNotification, api),
    takeLatest(NotificationTypes.NOTIFICATION_DELETE_REQUEST, deleteNotification, api),

    takeLatest(RestaurantTypes.RESTAURANT_REQUEST, getRestaurant, api),
    takeLatest(RestaurantTypes.RESTAURANT_ALL_REQUEST, getRestaurants, api),

    takeLatest(FoodTypes.FOOD_REQUEST, getFood, api),
    takeLatest(FoodTypes.FOOD_ALL_REQUEST, getFoods, api),
    
  ])
}
