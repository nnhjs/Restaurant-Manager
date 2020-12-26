import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Food from "../../components/Food";
import FoodActions from "../../modules/entities/food/food.reducer";
import styles from "./FindFoodScreen.styles";

const FindFoodScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState();
  useEffect(() => {
    dispatch(FoodActions.foodAllRequest({ keyword }));
  }, [keyword]);

  const { foods } = useSelector((state) => state.foods);
  const renderItem = ({ item }) => {
    return (
      <Food
        itemData={item}
        onPress={() =>
          navigation.navigate("FoodItemDetails", { itemData: item })
        }
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <TextInput
        placeholder="Nhập tên đồ ăn"
        style={{
          padding: 20,
          borderWidth: 0.6,
          borderColor: "#888",
          borderRadius: 30,
          marginHorizontal: 20,
        }}
        onChangeText={(text) => {
          setKeyword(text);
        }}
        value={keyword}
      />
      <View style={styles.container}>
        <FlatList
          data={foods?.data}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

export default FindFoodScreen;
