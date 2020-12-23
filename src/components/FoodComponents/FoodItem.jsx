import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

import Text from '../UIcomponents/Text';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#555555',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  image: {
    width: width - 50,
    height: 140,
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