import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Text from '../UIcomponents/Text';

import { useQuery } from '@apollo/react-hooks';
import { SINGLE_PRODUCT } from '../../graphql/queries';

import theme from '../../theme';

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 250,
    borderRadius: 5
  },
  close: {
    alignItems: 'flex-end' 
  },
  top: {
    flexDirection: 'row'
  }
});

const SingleProduct = ({ itemName, setModalOpen }) => {
  const product = useQuery(SINGLE_PRODUCT, {
    variables: { name: itemName },
  });

  if (product.loading) {
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  }

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <View style={theme.itemWithShadow}>
      <View style={styles.top}>
      <Image
          style={styles.image}
          source={{
            uri: product.data?.singleProduct.url
          }}
        />
        <TouchableOpacity onPress={closeModal} style={styles.close}>
          <Ionicons name='close-outline' size={28} style={styles.x}/>
        </TouchableOpacity>
      </View>
      <Text fontSize='subheading'>{product.data?.singleProduct.name}</Text>
      <Text>{product.data?.singleProduct.description}</Text>
      <Text>{product.data?.singleProduct.price} €</Text>
    </View>
  );
};

export default SingleProduct;