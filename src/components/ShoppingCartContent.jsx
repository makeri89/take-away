import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

import ShoppingCartStorageContext from '../contexts/ShoppingCartStorageContext';
import ShoppingCartItem from './ShoppingCartItem';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  header: {
    marginBottom: 10
  }
});

const ShoppingCart = ({ navigation, forcer }) => {
  const shoppingCartStorage = useContext(ShoppingCartStorageContext);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await shoppingCartStorage.getProducts()
        .then(products => setProductList(products));
      return data;
    };
    fetchData();
  },[navigation, forcer]);

  const renderItem = ({ item }) => (
    <ShoppingCartItem item={item} />
  );

  const productArray = Object.entries(productList);

  return (
    <View style={styles.container}>
      <FlatList
        data={productArray}
        renderItem={renderItem}
        keyExtractor={item => item[0]}
      />
    </View>
  );
};

export default ShoppingCart;