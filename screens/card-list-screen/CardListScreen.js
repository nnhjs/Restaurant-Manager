import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import styles from "./CardListScreen.styles";

const CardListScreen = ({ navigation }) => {
  const { restaurants } = useSelector((state) => state.restaurants);
  const renderItem = ({ item }) => {
    return (
      <Card
        itemData={item}
        onPress={() =>
          navigation.navigate("CardItemDetails", { itemData: item })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default CardListScreen;
