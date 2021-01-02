import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});

const Error = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text 
        color='error' 
        fontSize='subheading'
      >
        {message}
      </Text>
    </View>
  );
};

export default Error;