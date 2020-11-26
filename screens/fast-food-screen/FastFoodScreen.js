import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'

import Food from '../../components/Food';
import styles from './FastFoodScreen.styles'

import FoodActions from '../../modules/entities/food/food.reducer'

const FastFoodScreen = ({navigation}) => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(FoodActions.foodAllRequest())
  }, []) 

  const { foods } = useSelector(state => state.foods)
  console.log('foods', foods);
  const renderItem = ({item}) => {
      return (
          <Food 
              itemData={item}
              onPress={()=> navigation.navigate('FoodItemDetails', {itemData: item})}
          />
      );
  };

  return (
    <View style={styles.container}>
      <FlatList 
          data={foods?.data}
          renderItem={renderItem}
          keyExtractor={item => item._id}
      />
    </View>
  );
};

export default FastFoodScreen;
