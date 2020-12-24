import { useTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "../../components/StarRating";
import DealActions from "../../modules/entities/deal/deal.reducer";
import RestaurantActions from "../../modules/entities/restaurant/restaurant.reducer";
import { images } from "../../share/images/images";
import styles from "./HomeScreen.styles";

const RenderItem = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImgWrapper}>
        <Image
          source={{ uri: item?.image }}
          resizeMode="cover"
          style={styles.cardImg}
        />
      </View>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{`${item.title}`}</Text>
        <StarRating ratings={item.rating} reviews={item.reviews} />
        <Text style={styles.cardDetails} numberOfLines={3}>
          {`${item.description}`}
        </Text>
      </View>
    </View>
  );
};

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { restaurants } = useSelector((state) => state.restaurants);
  const { account } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(RestaurantActions.restaurantAllRequest());
    dispatch(DealActions.dealAllRequest({ id_account: account?._id }));
  }, []);
  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} />
      <View style={styles.sliderContainer}>
        <Swiper
          autoplay
          horizontal={false}
          height={200}
          activeDotColor="#FF6347"
        >
          <View style={styles.slide}>
            <Image
              source={images.foodBanner1}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={images.foodBanner2}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={images.foodBanner3}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>

      <View style={styles.categoryContainer}>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("CardListScreen", { title: "Nhà hàng" })
          }
        >
          <View style={styles.categoryIcon}>
            <Ionicons name="ios-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Nhà hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("FastFoodScreen", {
              title: "Đồ ăn nhanh",
              typeFood: "fastFood",
            })
          }
        >
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons
              name="food-fork-drink"
              size={35}
              color="#FF6347"
            />
          </View>
          <Text style={styles.categoryBtnTxt}>Đồ ăn nhanh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.categoryBtn}
          onPress={() =>
            navigation.navigate("FastFoodScreen", {
              title: "Đồ ăn vặt",
              typeFood: "snackFood",
            })
          }
        >
          <View style={styles.categoryIcon}>
            <MaterialCommunityIcons name="food" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Đồ ăn vặt</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.categoryContainer, { marginTop: 10 }]}>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Fontisto name="hotel" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Khách sạn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <Ionicons name="md-restaurant" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Quán ăn tối</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryBtn} onPress={() => {}}>
          <View style={styles.categoryIcon}>
            <MaterialIcons name="expand-more" size={35} color="#FF6347" />
          </View>
          <Text style={styles.categoryBtnTxt}>Thêm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsWrapper}>
        <Text
          style={{
            alignSelf: "center",
            fontSize: 18,
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Nổi bật
        </Text>
        {restaurants?.data?.length > 0
          ? restaurants?.data?.slice(0, 3).map((item, index) => {
              return <RenderItem item={item} key={index} />;
            })
          : null}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
