import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import styles from "./HotelListScreen.styles";

const HotelListScreen = ({ navigation }) => {
  const { hotels } = useSelector((state) => state.hotels);
  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() =>
          navigation.navigate("HotelItemScreen", { itemData: item })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={hotels?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default HotelListScreen;
