import React from 'react';
import { View, StyleSheet } from 'react-native';
import { diff } from 'react-native-reanimated';

import Text from '../UIcomponents/Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#555555',
    shadowOpacity: 0.8,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowRadius: 5
  }
});

const SingleOrder = ({ order }) => {



  return (
    <View style={styles.container}>
      <Text fontSize='subheading'>{order.date}</Text>
      {order.products.map(product => (
        <Text key={product.id}>{product.amount} x {product.name} for {product.price} euros</Text>
      ))}
      <Text>In total {order.subTotal} euros</Text>
    </View>
  );
};

export default SingleOrder;