import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Avatar, useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";
import CardItemDetails from "./card-item-details/CardItemDetails";
import CardListScreen from "./card-list-screen/CardListScreen";
import CartScreen from "./cart-screen/CartScreen";
import EditProfileScreen from "./edit-profile-screen/EditProfileScreen";
import ExploreScreen from "./explore-screen/ExploreScreen";
import FastFoodScreen from "./fast-food-screen/FastFoodScreen";
import FindFoodScreen from "./find-food-screen/FindFoodScreen";
import FoodItemDetails from "./food-item-details/FoodItemDetail";
import HomeScreen from "./home-screen/HomeScreen";
import HotelItemScreen from "./hotel-item-details/HotelItemDetails";
import HotelListScreen from "./hotels-screen/HotelListScreen";
import NotificationItemDetailsScreen from "./notification-item-details/NotificationItemDetails";
import NotificationScreen from "./notification-screen/NotificationScreen";
import OrderScreen from "./order-screen/OrderScreen";
import ProfileScreen from "./profile-screen/ProfileScreen";
const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const CartStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
  const { carts } = useSelector((state) => state.carts);
  return (
    <Tab.Navigator initialRouteName="Home" activeColor="#fff">
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Trang chủ",
          tabBarColor: "#FF6347",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: "Thông báo",
          tabBarColor: "#1f65ff",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: "Khám phá",
          tabBarColor: "#d02860",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackScreen}
        options={{
          tabBarLabel: "Giỏ hàng",
          tabBarColor: "#5aa469",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-cart" color={color} size={26} />
          ),
          tabBarBadge: carts.length || null,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Cá nhân",
          tabBarColor: "#694fad",
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabScreen;

const HomeStackScreen = ({ navigation }) => {
  const { account } = useSelector((state) => state.login);
  const { colors } = useTheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Tìm kiếm đồ ăn",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            >
              <Icon.Button
                name="ios-menu"
                size={25}
                color={colors.text}
                backgroundColor={colors.background}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row", marginRight: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("FindFoodScreen", {
                    title: "Tìm kiếm đồ ăn",
                  });
                }}
              >
                <Icon.Button
                  name="ios-search"
                  size={25}
                  color={colors.text}
                  backgroundColor={colors.background}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ paddingHorizontal: 10, marginTop: 5 }}
                onPress={() => {
                  navigation.navigate("Profile");
                }}
              >
                <Avatar.Image
                  source={{
                    uri: account?.img_url,
                  }}
                  size={30}
                />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <HomeStack.Screen
        name="CardListScreen"
        component={CardListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="CardItemDetails"
        component={CardItemDetails}
        options={({ route }) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        })}
      />
      <HomeStack.Screen
        name="FastFoodScreen"
        component={FastFoodScreen}
        options={({ route }) => ({
          // title: route.params.title,
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="FoodItemDetails"
        component={FoodItemDetails}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        })}
      />
      <HomeStack.Screen
        name="HotelListScreen"
        component={HotelListScreen}
        options={({ route }) => ({
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
      <HomeStack.Screen
        name="HotelItemScreen"
        component={HotelItemScreen}
        options={({ route }) => ({
          // title: route.params.title,
          headerBackTitleVisible: false,
          headerTitle: false,
          headerTransparent: true,
          headerTintColor: "#fff",
        })}
      />
      <HomeStack.Screen
        name="FindFoodScreen"
        component={FindFoodScreen}
        options={({ route }) => ({
          // title: route.params.title,
          title: route.params.title,
          headerBackTitleVisible: false,
        })}
      />
    </HomeStack.Navigator>
  );
};

const NotificationStackScreen = ({ navigation }) => (
  <NotificationStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1f65ff",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <NotificationStack.Screen
      name="Thông báo"
      component={NotificationScreen}
      options={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" />
          </TouchableOpacity>
        ),
      }}
    />
    <NotificationStack.Screen
      name="Chi tiết thông báo"
      component={NotificationItemDetailsScreen}
      options={{
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" />
          </TouchableOpacity>
        ),
      }}
    />
  </NotificationStack.Navigator>
);

const ProfileStackScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            >
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => navigation.navigate("EditProfile")}
            >
              <MaterialCommunityIcons.Button
                name="account-edit"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ProfileStack.Screen
        name="EditProfile"
        options={{
          title: "Edit Profile",
        }}
        component={EditProfileScreen}
      />
    </ProfileStack.Navigator>
  );
};

const CartStackScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { deals } = useSelector((state) => state.deals);
  return (
    <CartStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          shadowColor: colors.background, // iOS
          elevation: 0, // Android
        },
        headerTintColor: colors.text,
      }}
    >
      <CartStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: "Giỏ hàng",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            >
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10 }}
              onPress={() => {
                navigation.navigate("OrderScreen");
              }}
            >
              {/* <Badge
                status="success"
                value={3}
                containerStyle={{ position: "absolute", top: -4, right: -4 }}
              /> */}
              <Text
                style={{
                  color: "red",
                  position: "absolute",
                  top: -4,
                  right: -4,
                  zIndex: 999,
                  padding: 8,
                }}
              >
                {deals.length}
              </Text>
              <Icon.Button
                name="ios-basket"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <CartStack.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          title: "Danh sách đơn hàng",
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => navigation.openDrawer()}
            >
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor={colors.background}
                color={colors.text}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </CartStack.Navigator>
  );
};
