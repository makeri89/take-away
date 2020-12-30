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

  const differentProducts = {};

  console.log(order);

  order.products.map(product => {
    if (!differentProducts[product.name]) {
      differentProducts[product.name] = 1;
    } else {
      differentProducts[product.name] += 1;
    }
  });

  console.log('prods', differentProducts);

  const amounts = order.products.map(product => product.price * differentProducts[product.name]);
  const reducer = (acc, curr) => acc + curr;
  const totalSum = amounts.reduce(reducer);

  return (
    <View style={styles.container}>
      <Text fontSize='subheading'>{order.date}</Text>
      {order.products.map(product => (
        <Text key={product.id}>{differentProducts[product.name]} x {product.name} for {product.price} euros</Text>
      ))}
      <Text>In total {totalSum} euros</Text>
    </View>
  );
};

export default SingleOrder;