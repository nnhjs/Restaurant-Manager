import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { convertPrice } from "../../share/utils/convertPrice";
import {
  convertColorStatus,
  convertTextStatus,
} from "../../share/utils/convertStatus";
const OrderScreen = () => {
  const { deals } = useSelector((state) => state.deals);
  const renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 12,
          marginBottom: 12,
          paddingVertical: 12,
        }}
      >
        <Text style={{ color: "#666" }}>04, Dec 13:41</Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 6 }}>
          {`Đơn hàng thứ ${index + 1} `}
        </Text>
        <Text style={{ color: "#666", marginVertical: 12 }}>{`${
          item?.deal?.length
        } Items | ${convertPrice(item?.totalPrice)}`}</Text>
        <Text
          style={{
            paddingVertical: 6,
            borderWidth: 1.2,
            borderColor: `${convertColorStatus[item.status]}`,
            textAlign: "center",
            color: `${convertColorStatus[item.status]}`,
          }}
        >
          {`${convertTextStatus[item.status]}`}
        </Text>
      </View>
    );
  };
  const keyExtractor = (item, index) => `${index}`;
  const ListHeaderComponent = () => {
    return (
      <View style={{ marginVertical: 16, marginLeft: 12 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#888" }}>
          Danh sách đơn hàng
        </Text>
      </View>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <FlatList
        data={deals}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeaderComponent}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
