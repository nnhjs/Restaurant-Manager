import React from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import Card from "../../components/Card";
import styles from "./CardListScreen.styles";
import { useRoute } from '@react-navigation/native'

const CardListScreen = ({ navigation }) => {
  const route = useRoute()
  const type = route.params?.type;
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
        data={type ? restaurants?.data.filter((item) => item.type === "restaurantNight") : restaurants?.data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default CardListScreen;
