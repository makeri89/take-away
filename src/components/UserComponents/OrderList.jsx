import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import SingleOrder from './SingleOrder';
import Text from '../UIcomponents/Text';

import { useQuery } from '@apollo/react-hooks';
import { ALL_ORDERS } from '../../graphql/queries';

const styles = StyleSheet.create({
  header: {
    marginLeft: 30,
    // marginBottom: -20,
    marginTop: 30
  },
  list: {
    paddingBottom: 10
  }
});

const OrderList = ({ customer }) => {
  
  const orders = useQuery(ALL_ORDERS, {
    variables: { customer: customer }
  });

  if (orders.loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <SingleOrder order={item} />
  );

  return (
    <View>
      <Text fontSize='subheading' style={styles.header}>Your orders</Text>
      <FlatList
        data={orders.data?.allOrders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </View>
  );
};

export default OrderList;