import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import Text from './UIcomponents/Text';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10
  },
  image: {
    width: width - 50,
    height: 120,
    borderRadius: 10,
    marginBottom: 5
  }
});

const FoodItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.url
        }}
      />
      <Text fontSize='header'>{item.name}</Text>
      <Text color='textSecondary'>{item.description}</Text>
      <Text>{item.price} €</Text>
    </View>
  );
};

export default FoodItem;