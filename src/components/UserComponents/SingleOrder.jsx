import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '../UIcomponents/Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 30,
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

  const amounts = order.products.map(product => product.price * product.amount);
  const reducer = (acc, curr) => acc + curr;
  const totalSum = amounts.reduce(reducer);

  return (
    <View style={styles.container}>
      <Text fontSize='subheading'>{order.date}</Text>
      {order.products.map(product => (
        <Text key={product.id}>{product.amount} x {product.name} for {product.price} euros</Text>
      ))}
      <Text>In total {totalSum} euros</Text>
    </View>
  );
};

export default SingleOrder;