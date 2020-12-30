import React, { useContext, useState } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import NumericInput from 'react-native-numeric-input';

import Text from '../UIcomponents/Text';
import Button from '../UIcomponents/Button';

import ShoppingCartStorageContext from '../../contexts/ShoppingCartStorageContext';

import theme from '../../theme';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: theme.colors.shadow,
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
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    marginBottom: -10
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
      <View style={styles.info}>
        <View>
          <Text fontSize='header'>{item.name}</Text>
          <Text color='textSecondary'>{item.description}</Text>
          <Text>{item.price} €</Text>
        </View>
        <View>
          <NumericInput 
            value={amount} 
            onChange={value => setAmount(value)} 
            rounded
            totalWidth={110}
            totalHeight={45}
            minValue={0}
          />
          <Button 
            onPress={() => addToCart(item.name)} 
            text='Add to cart' 
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

export default FoodItem;