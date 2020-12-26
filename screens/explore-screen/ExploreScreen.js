import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "../../components/StarRating";
import { mapDarkStyle, mapStandardStyle } from "../../model/mapData";
import { images } from "../../share/images/images";
import styles from "./ExploreScreen.styles";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = 220;
const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

const ExploreScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [options, setOptions] = useState(1);
  const restaurants = useSelector(
    (state) => state?.restaurants?.restaurants?.data
  );
  const hotels = useSelector((state) => state?.hotels?.hotels?.data);
  const initialMapState = {
    id: 1,
    restaurants: restaurants,
    categories: [
      // {
      //   name: "Quán ăn nhanh",
      //   icon: (
      //     <MaterialCommunityIcons
      //       style={styles.chipsIcon}
      //       name="food-fork-drink"
      //       size={18}
      //     />
      //   ),
      // },
      {
        id: 1,
        name: "Nhà hàng",
        icon: (
          <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />
        ),
      },
      // {
      //   name: "Quán ăn tối",
      //   icon: (
      //     <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />
      //   ),
      // },
      // {
      //   name: "Đồ ăn vặt",
      //   icon: (
      //     <MaterialCommunityIcons
      //       name="food"
      //       style={styles.chipsIcon}
      //       size={18}
      //     />
      //   ),
      // },
      {
        id: 2,
        name: "Khách sạn",
        icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      },
    ],
    region: {
      latitude: 21.027763,
      longitude: 105.83416,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const initialMapStateHotel = {
    id: 2,
    restaurants: hotels,
    categories: [
      // {
      //   name: "Quán ăn nhanh",
      //   icon: (
      //     <MaterialCommunityIcons
      //       style={styles.chipsIcon}
      //       name="food-fork-drink"
      //       size={18}
      //     />
      //   ),
      // },
      {
        id: 1,
        name: "Nhà hàng",
        icon: (
          <Ionicons name="ios-restaurant" style={styles.chipsIcon} size={18} />
        ),
      },
      // {
      //   name: "Quán ăn tối",
      //   icon: (
      //     <Ionicons name="md-restaurant" style={styles.chipsIcon} size={18} />
      //   ),
      // },
      // {
      //   name: "Đồ ăn vặt",
      //   icon: (
      //     <MaterialCommunityIcons
      //       name="food"
      //       style={styles.chipsIcon}
      //       size={18}
      //     />
      //   ),
      // },
      {
        id: 2,
        name: "Khách sạn",
        icon: <Fontisto name="hotel" style={styles.chipsIcon} size={15} />,
      },
    ],
    region: {
      latitude: 21.027763,
      longitude: 105.83416,
      latitudeDelta: 0.04864195044303443,
      longitudeDelta: 0.040142817690068,
    },
  };

  const [state, setState] = React.useState(initialMapState);

  let mapIndex = 0;
  let mapAnimation = new Animated.Value(0);

  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
      if (index >= state.restaurants.length) {
        index = state.restaurants.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      clearTimeout(regionTimeout);

      const regionTimeout = setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { coordinate } = state.restaurants[index];
          _map.current.animateToRegion(
            {
              ...coordinate,
              latitudeDelta: state.region.latitudeDelta,
              longitudeDelta: state.region.longitudeDelta,
            },
            350
          );
        }
      }, 10);
    });
  });

  const interpolations = state.restaurants.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;

    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _map = React.useRef(null);
  const _scrollView = React.useRef(null);

  return (
    <View style={styles.container}>
      <MapView
        ref={_map}
        initialRegion={state.region}
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        customMapStyle={theme.dark ? mapDarkStyle : mapStandardStyle}
      >
        {state.restaurants.map((marker, index) => {
          // const scaleStyle = {
          //   transform: [
          //     {
          //       scale: interpolations[index].scale,
          //     },
          //   ],
          // };
          return (
            <MapView.Marker
              key={index}
              coordinate={marker.coordinate}
              onPress={(e) => onMarkerPress(e)}
            >
              <Animated.View style={[styles.markerWrap]}>
                <Animated.Image
                  source={images.mapMarker}
                  // style={[styles.marker, scaleStyle]}
                  style={[styles.marker]}
                  resizeMode="cover"
                />
              </Animated.View>
            </MapView.Marker>
          );
        })}
      </MapView>
      <View style={styles.searchBox}>
        <TextInput
          placeholder="Tìm kiếm"
          placeholderTextColor="#000"
          autoCapitalize="none"
          style={{ flex: 1, padding: 0 }}
        />
        <Ionicons name="ios-search" size={20} />
      </View>
      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        height={50}
        style={styles.chipsScrollView}
        contentInset={{
          // iOS only
          top: 0,
          left: 0,
          bottom: 0,
          right: 20,
        }}
        contentContainerStyle={{
          paddingRight: Platform.OS === "android" ? 20 : 0,
        }}
      >
        {state.categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={styles.chipsItem}
            onPress={() => {
              category.id === 1
                ? setState(initialMapState)
                : setState(initialMapStateHotel);
            }}
          >
            {category.icon}
            <Text>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      >
        {state.restaurants.map((marker, index) => (
          <View style={styles.card} key={index}>
            <Image
              source={{ uri: marker.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />
            <View style={styles.textContent}>
              <Text numberOfLines={1} style={styles.cardtitle}>
                {marker.title}
              </Text>
              <StarRating ratings={marker.rating} reviews={marker.reviews} />
              <Text numberOfLines={1} style={styles.cardDescription}>
                {marker.description}
              </Text>
              <View style={styles.button}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(
                      state.id === 1 ? "CardItemDetails" : "HotelItemScreen",
                      {
                        itemData: marker,
                      }
                    );
                  }}
                  style={[
                    styles.signIn,
                    {
                      borderColor: "#FF6347",
                      borderWidth: 1,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#FF6347",
                      },
                    ]}
                  >
                    Đặt ngay
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default ExploreScreen;
