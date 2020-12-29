import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './UIcomponents/Text';

const ShoppingCartItem = ({ item }) => {
  return (
    <View>
      <Text>{item[0]}</Text>
      <Text>{item[1]}</Text>
    </View>
  );
};

export default ShoppingCartItem;