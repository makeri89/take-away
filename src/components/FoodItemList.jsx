import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';

import FoodItem from './FoodItem';
import ItemSeparator from './UIcomponents/ItemSeparator';

import { mockdata } from '../../mockData';
const data = mockdata;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  }
});

const FoodItemList = () => {
  const renderItem = ({ item }) => (
    <FoodItem item={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparator}
      />
    </View>
  );
};

export default FoodItemList;