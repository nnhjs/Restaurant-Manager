import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { convertPrice } from "../../share/utils/convertPrice";
import {
  convertColorStatus,
  convertTextStatus,
} from "../../share/utils/convertStatus";
import { formart } from "../../share/utils/formartTime";
import DealActions from "../../modules/entities/deal/deal.reducer";
const OrderScreen = () => {
  const dispatch = useDispatch()
  const { deals } = useSelector((state) => state.deals);
  const { account } = useSelector((state) => state.login);
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
        <Text style={{ color: "#666" }}>{formart(item?.created)}</Text>
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
        refreshing={false}
        onRefresh={() => {
          dispatch(DealActions.dealAllRequest({ id_account: account?._id }));
        }}
      />
    </View>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({});
