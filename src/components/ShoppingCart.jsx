import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import ShoppingCartStorageContext from '../contexts/ShoppingCartStorageContext';
import Text from './UIcomponents/Text';
import Button from './UIcomponents/Button';
import ShoppingCartContent from './ShoppingCartContent';

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
    marginHorizontal: 80,
  },
  buttonToBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%'
  }
});

const ShoppingCart = ({ navigation, forcer, setForcer }) => {
  const shoppingCartStorage = useContext(ShoppingCartStorageContext);

  const clearCart  = async () => {
    await shoppingCartStorage.clearProducts();
    setForcer(Math.random());
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
      </View>
    </View>
  );
};

export default ShoppingCart;