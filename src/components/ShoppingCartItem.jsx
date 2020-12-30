import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import SingleProduct from './FoodComponents/SingleProduct';

import Text from './UIcomponents/Text';

const styles = StyleSheet.create({
  item: {
    padding: 10,
    textAlign: 'center'
  }
});

const ShoppingCartItem = ({ item }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  
  return (
    <View>
      {modalOpen
      ?
        <SingleProduct itemName={item[0]} setModalOpen={setModalOpen} />
      :
        <TouchableOpacity onPress={openModal}>
          <Text style={styles.item}>{item[1]}x {item[0]}</Text>
        </TouchableOpacity>
      }
    </View>
  );
};

export default ShoppingCartItem;