import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './BookmarkScreen.styles'
const BookmarkScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Bookmark Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default BookmarkScreen;