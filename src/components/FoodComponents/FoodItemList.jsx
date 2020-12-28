import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import Constants from 'expo-constants';

import FoodItem from './FoodItem';
import ItemSeparator from '../UIcomponents/ItemSeparator';
import Text from '../UIcomponents/Text';

// import { mockdata } from '../../../mockData';
// const data = mockdata;

import { useQuery } from '@apollo/client';
import { ALL_PRODUCTS } from '../../graphql/queries';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
  },
  header: {
    textAlign: 'center',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f2f0e1',
    marginTop: -10
  }
});

const FoodItemList = () => {

  const products = useQuery(ALL_PRODUCTS, {
    fetchPolicy: 'cache-and-network'
  });

  // console.log(products.data);

  if (products.loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // console.log(products.data)

  const data = products.data.allProducts;
  // console.log(data);

  const renderItem = ({ item }) => (
    <FoodItem item={item} />
  );

  const Header = () => {
    return (
      <Text 
        fontSize='header' 
        fontWeight='bold' 
        style={styles.header}
      >
        Order take away
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={Header}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

export default FoodItemList;