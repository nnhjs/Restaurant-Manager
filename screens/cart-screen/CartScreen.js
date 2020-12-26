import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../components/context";
import DealActions from "../../modules/entities/deal/deal.reducer";
import { images } from "../../share/images/images";
import { convertPrice } from "../../share/utils/convertPrice";
import styles from "./CartScreen.styles";
const CartScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { signOut } = React.useContext(AuthContext);
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.login);
  const { carts } = useSelector((state) => state.carts);
  const convertCarts = [];
  for (let cart of carts) {
    if (convertCarts.map((item) => item._id).indexOf(cart._id) === -1) {
      convertCarts.push({
        ...cart,
        total: carts.filter((ele) => ele._id === cart._id).length,
      });
    }
  }
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
            <Text>{`Giá: ${convertPrice(item?.price)}`}</Text>
          </View>
        </View>
        <Text style={{ marginHorizontal: 6 }}>{`x${item?.total || 0}`}</Text>
        <Text>{`${convertPrice(parseInt(item?.price) * item.total)}`}</Text>
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
      <View style={{ marginBottom: 16 }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Tôi đồng ý với mọi điều khoản, tiếp tục mua hàng
              </Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#61b15a" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Trở lại</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.openButton, backgroundColor: "#61b15a" }}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                    dispatch(
                      DealActions.createDealRequest({
                        id_account: account._id,
                        deal: convertCarts,
                        totalPrice: convertCarts.reduce((acc, cur) => {
                          return acc + cur.total * cur.price;
                        }, 0),
                        status: "pending",
                        created: new Date(),
                      })
                    );
                  }}
                >
                  <Text style={styles.textStyle}>Đồng ý</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
            {convertPrice(
              convertCarts.reduce((acc, cur) => {
                return acc + cur.total * cur.price;
              }, 0)
            )}
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
            account ? setModalVisible(true) : signOut();
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
      data={convertCarts}
      initialNumToRender={10}
      ListFooterComponent={ListFooterComponent}
      ListEmptyComponent={renderEmpty}
    />
  );
};

export default CartScreen;
