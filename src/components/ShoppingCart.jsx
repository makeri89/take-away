import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Button, FlatList } from 'react-native';
import Constants from 'expo-constants';

import ShoppingCartStorageContext from '../contexts/ShoppingCartStorageContext';
import Text from './UIcomponents/Text';
import ShoppingCartItem from './ShoppingCartItem';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center'
  },
  header: {
    marginBottom: 10
  }
});

const ShoppingCart = ({ navigation, test, setForcer }) => {
  const shoppingCartStorage = useContext(ShoppingCartStorageContext);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await shoppingCartStorage.getProducts()
        .then(products => setProductList(products));
      return data;
    };
    fetchData();
  },[navigation, test]);

  const clearCart  = async () => {
    await shoppingCartStorage.clearProducts();
    setForcer(Math.random());
  };

  const renderItem = ({ item }) => (
    <ShoppingCartItem item={item} />
  );

  console.log(productList);

  const productArray = Object.entries(productList);

  console.log(productArray);

  return (
    <View style={styles.container}>
      <Text fontSize='header' style={styles.header}>Hello shopping cart</Text>
      <FlatList
        data={productArray}
        renderItem={renderItem}
        keyExtractor={item => item[0]}
      />
      <Button onPress={clearCart} title='Empty cart' />
    </View>
  );
};

export default ShoppingCart;