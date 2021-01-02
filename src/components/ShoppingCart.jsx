import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import Constants from 'expo-constants';

import ShoppingCartStorageContext from '../contexts/ShoppingCartStorageContext';
import Text from './UIcomponents/Text';
import Button from './UIcomponents/Button';
import ShoppingCartContent from './ShoppingCartContent';
import Error from './UIcomponents/Error';

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
  const [error, setError] = useState(false);

  if (user.loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  console.log('user', user.data);

  const clearCart  = async () => {
    Alert.alert(
      'Clear cart?',
      'Remove all items from your cart?',
      [
        {
          text: 'Remove',
          onPress: async () => {
            await shoppingCartStorage.clearProducts();
            setForcer(Math.random());
          }
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
    
  };

  const onSubmit = async () => {
    const products = await shoppingCartStorage.getProducts();
    const formattedProducts = [];
    for (const [k,v] of Object.entries(products)) {
      formattedProducts.push(`${k};${v}`);
    }

    Alert.alert(
      'Submit new order',
      'Submit new order',
      [
        {
          text: 'Submit',
          onPress: async () => {
            try {
              const { data } = await newOrder({
                products: formattedProducts,
                customer: user.data?.me?.username || ''
              });
              await shoppingCartStorage.clearProducts();
              apolloClient.resetStore();
              console.log(data);
              setForcer(Math.random());
            } catch (err) {
              setError(true);
              setTimeout(() => {
                setError(false);
              }, 5000);
            }
          }
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Canceled'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );

    
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
      {error &&
        <Error message='Something went wrong. Are you sure you are logged in?' />
      }
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