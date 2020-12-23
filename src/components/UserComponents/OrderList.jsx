import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import SingleOrder from './SingleOrder';
import Text from '../UIcomponents/Text';

import { mockorders } from '../../../mockData';
const data = mockorders;

const styles = StyleSheet.create({
  header: {
    marginLeft: 30,
    marginBottom: -20,
    marginTop: 30
  }
});

const OrderList = () => {
  const renderItem = ({ item }) => (
    <SingleOrder order={item} />
  );

  return (
    <View>
      <Text fontSize='subheading' style={styles.header}>Your orders</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default OrderList;