import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import DealActions from "../../modules/entities/deal/deal.reducer";
import { images } from "../../share/images/images";
import { converPrice } from "../../share/utils/convertPrice";
const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.login);
  const { carts } = useSelector((state) => state.carts);
  console.log("carts", carts);
  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          paddingVertical: 24,
          alignItems: "flex-end",
        }}
        key={item._id}
      >
        <View>
          <Image
            source={{ uri: item?.image }}
            style={{ width: 100, height: 100, borderRadius: 5 }}
          />
          <View>
            <Text style={{ paddingBottom: 4 }}>{`${item?.name}`}</Text>
            <Text>{`Giá: ${converPrice(item?.price)}`}</Text>
          </View>
        </View>
        <Text style={{ marginHorizontal: 6 }}>
          {`x${carts.filter((ele) => ele._id === item._id)?.length || 0}`}
        </Text>
        <Text>{`${converPrice(
          parseInt(item?.price) *
            carts.filter((ele) => ele._id === item._id)?.length
        )}`}</Text>
      </View>
    );
  };

  const keyExtractor = (item, index) => index;

  const ListHeaderComponent = () => {
    return carts.length ? (
      <View
        style={{
          marginHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text style={{ fontWeight: "bold", color: "#61b15a" }}>Sản Phẩm</Text>
        <Text style={{ fontWeight: "bold", color: "#61b15a" }}>Số lượng</Text>
        <Text style={{ fontWeight: "bold", color: "#61b15a" }}>Tiền</Text>
      </View>
    ) : null;
  };

  const renderEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 120,
        }}
      >
        <Image source={images.shopping} style={{ width: 200, height: 200 }} />
        <Text style={{ color: "#888" }}>
          Hãy chọn đồ ăn mà bạn muốn mua nào
        </Text>
      </View>
    );
  };

  const ListFooterComponent = () => {
    return carts.length ? (
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 16,
            flex: 1,
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "#61b15a" }}>
            Tổng tiền:
          </Text>
          <Text style={{ color: "#61b15a", fontSize: 22 }}>
            {converPrice(200000)}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#61b15a",
            marginHorizontal: 16,
            paddingVertical: 16,
            marginTop: 32,
          }}
          onPress={() => {
            dispatch(
              DealActions.createDealRequest({
                id_account: account._id,
                deal: carts,
              })
            );
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              color: "#fff",
              fontSize: 18,
            }}
          >
            Thanh Toán
          </Text>
        </TouchableOpacity>
      </View>
    ) : null;
  };

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={carts}
      initialNumToRender={10}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={renderEmpty}
    />
  );
};

export default CartScreen;
