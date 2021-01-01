import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import ShoppingCartStorageContext from '../contexts/ShoppingCartStorageContext';
import Text from './UIcomponents/Text';
import Button from './UIcomponents/Button';
import ShoppingCartContent from './ShoppingCartContent';

import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { ME } from '../graphql/queries';
import useNewOrder from '../hooks/useNewOrder';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  },
  header: {
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    // marginHorizontal: 80,
  },
  buttonToBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});

const ShoppingCart = ({ navigation, forcer, setForcer }) => {
  const apolloClient = useApolloClient();
  const shoppingCartStorage = useContext(ShoppingCartStorageContext);
  const [newOrder] = useNewOrder();
  const user = useQuery(ME);

  if (user.loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  console.log(user.data);

  const clearCart  = async () => {
    await shoppingCartStorage.clearProducts();
    setForcer(Math.random());
  };

  const onSubmit = async () => {
    const products = await shoppingCartStorage.getProducts();
    const formattedProducts = [];
    for (const [k,v] of Object.entries(products)) {
      formattedProducts.push(`${k};${v}`);
    }
    console.log(formattedProducts);

    try {
      const { data } = await newOrder({
        products: formattedProducts,
        customer: user.data.me.username
      });
      await shoppingCartStorage.clearProducts();
      apolloClient.resetStore();
      console.log(data);
      setForcer(Math.random());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.container}>
      <Text 
        fontSize='header' 
        fontWeight='bold'
        style={styles.header}
      >
        Your current order
      </Text>
      <ShoppingCartContent 
        navigation={navigation} 
        forcer={forcer} 
      />
      <View style={styles.buttonToBottom}>
        <Button 
          onPress={clearCart} 
          text='Remove all' 
          style={styles.button} 
          color={theme.colors.error}
        />
        <Button
          text='Submit order'
          style={styles.button}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

export default ShoppingCart;