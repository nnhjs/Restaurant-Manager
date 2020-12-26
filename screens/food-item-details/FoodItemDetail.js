import React, { useRef } from "react";
import {
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import HeaderImageScrollView, {
  TriggeringView,
} from "react-native-image-header-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";
import CartActions from "../../modules/entities/cart/cart.reducer";
import { images } from "../../share/images/images";
import { convertPrice } from "../../share/utils/convertPrice";
import styles from "./FoodItemDetail.styles";

const MIN_HEIGHT = Platform.OS === "ios" ? 90 : 55;
const MAX_HEIGHT = 350;

const FoodItemDetails = ({ route }) => {
  const itemData = route.params.itemData;
  const dispatch = useDispatch();
  const navTitleView = useRef(null);
  const { carts } = useSelector((state) => state.carts);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image source={{ uri: itemData.image }} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{itemData.name}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{itemData.title}</Text>
          </Animatable.View>
        )}
      >
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.title}>Giới thiệu</Text>
            <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
              <FontAwesome name="star" size={16} color="#FF6347" />
              <Text style={{ marginHorizontal: 2 }}>{itemData.rating}</Text>
              <Text>({itemData.reviews})</Text>
            </View>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{itemData.description}</Text>
        </View>
        <View
          style={{
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "green",
            marginTop: 20,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "green",
            }}
          >
            {convertPrice(itemData?.price)}
          </Text>
        </View>
        {/* <TouchableOpacity
          style={{
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "green",
            marginTop: 20,
            marginHorizontal: 20,
          }}
          onPress={() => {
            alert("booking");
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 16,
              color: "green",
            }}
          >
            Đặt ngay
          </Text>
        </TouchableOpacity> */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              dispatch(CartActions.cartSubtract(itemData));
            }}
            disabled={!carts.filter((ele) => ele._id === itemData._id)?.length}
          >
            <Image source={images.subtract} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <Text style={{ marginHorizontal: 6 }}>
            {carts.filter((ele) => ele._id === itemData._id)?.length || 0}
          </Text>
          <TouchableOpacity
            onPress={() => {
              dispatch(CartActions.cartAdd(itemData));
            }}
          >
            <Image source={images.add} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};

export default FoodItemDetails;
