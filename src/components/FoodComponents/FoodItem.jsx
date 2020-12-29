import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, Dimensions, Button } from 'react-native';
import NumericInput from 'react-native-numeric-input';

import Text from '../UIcomponents/Text';

import ShoppingCartStorageContext from '../../contexts/ShoppingCartStorageContext';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#555555',
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  image: {
    width: width - 50,
    height: 140,
    borderRadius: 10,
    marginBottom: 5
  }
});

const FoodItem = ({ item, setForcer }) => {
  const [amount, setAmount] = useState(0);
  const shoppingCartStorage = useContext(ShoppingCartStorageContext);

  const addToCart = async (name) => {
    await shoppingCartStorage.addProduct(name, amount);
    setForcer(Math.random());
    setAmount(0);
  };
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.url
        }}
      />
      <Text fontSize='header'>{item.name}</Text>
      <Text color='textSecondary'>{item.description}</Text>
      <Text>{item.price} €</Text>
      <NumericInput 
        value={amount} 
        onChange={value => setAmount(value)} 
        rounded
      />
      <Button onPress={() => addToCart(item.name)} title='Add to cart' />
    </View>
  );
};

export default FoodItem;