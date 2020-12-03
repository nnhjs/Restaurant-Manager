import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import {
  View,
  Text,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import { converPrice } from '../../share/utils/convertPrice'

import * as Animatable from 'react-native-animatable';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import FoodActions from '../../modules/entities/food/food.reducer'

import styles from './CardItemDetails.styles'
import { images } from '../../share/images/images'
const MIN_HEIGHT = Platform.OS === 'ios' ? 90 : 55;
const MAX_HEIGHT = 350;

const CardItemDetails = ({route}) => {
  const dispatch = useDispatch();
  const itemData = route.params.itemData;
  const navTitleView = useRef(null);
  const { foods } = useSelector(state => state.foods);
  console.log('foods', foods)
  useEffect(() => {
    dispatch(FoodActions.foodAllRequest({ id_restaurant: itemData._id }))
  }, [])
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderImageScrollView
        maxHeight={MAX_HEIGHT}
        minHeight={MIN_HEIGHT}
        maxOverlayOpacity={0.6}
        minOverlayOpacity={0.3}
        renderHeader={() => (
          <Image source={{uri: itemData.image}} style={styles.image} />
        )}
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{itemData.title}</Text>
          </View>
        )}
        renderFixedForeground={() => (
          <Animatable.View style={styles.navTitleView} ref={navTitleView}>
            <Text style={styles.navTitle}>{itemData.title}</Text>
          </Animatable.View>
        )}>
        <TriggeringView
          style={styles.section}
          onHide={() => navTitleView.current.fadeInUp(200)}
          onDisplay={() => navTitleView.current.fadeOut(100)}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.title}>Giới thiệu</Text>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <FontAwesome name="star" size={16} color="#FF6347" />
              <Text style={{marginHorizontal: 2}}>{itemData.rating}</Text>
              <Text>({itemData.reviews})</Text>
            </View>
          </View>
        </TriggeringView>
        <View style={[styles.section, styles.sectionLarge]}>
          <Text style={styles.sectionContent}>{itemData.description}</Text>
        </View>
        {
          foods?.data.map((item) => {
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, paddingVertical: 24, alignItems: 'center' }} >
                <View>
                  <Text style={{ paddingBottom: 24, }} >
                    { `${item?.name}` }
                  </Text>
                  <Text>
                    { `${converPrice(item?.price)}` }
                  </Text>
                </View>
                <Image source={{ uri: item?.image}} style={{ width: 100, height: 100, borderRadius: 5, }} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <Image source={images.subtract} style={{ width: 40, height: 40 }} />
                  <Text style={{ marginHorizontal: 6, }} >
                    0
                  </Text>
                  <Image source={images.add} style={{ width: 40, height: 40 }} />
                </View>
              </View>
            )
          })
        }
        <View style={styles.section}>
          <View style={styles.categories}>
            {itemData.categories.map((category, index) => (
              <View style={styles.categoryContainer} key={index}>
                <FontAwesome name="tag" size={16} color="#fff" />
                <Text style={styles.category}>{category}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.section, {height: 250}]}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={{
              latitude: itemData.coordinate.latitude,
              longitude: itemData.coordinate.longitude,
              latitudeDelta: 0.00864195044303443,
              longitudeDelta: 0.000142817690068,
            }}>
            <MapView.Marker
              coordinate={itemData.coordinate}
              image={images.mapMarker}
            />
          </MapView>
        </View>
      </HeaderImageScrollView>
    </View>
  );
};

export default CardItemDetails;
