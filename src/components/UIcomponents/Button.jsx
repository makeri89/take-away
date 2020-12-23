import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
    overflow: 'hidden',
    backgroundColor: '#24b719',
    color: '#fff',
  }
});

const Button = ({ text, color, ...props }) => {

  const bgColor = color ? color : '#24b719';

  return (
    <TouchableOpacity {...props}>
      <Text style={{
        margin: 10,
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
        overflow: 'hidden',
        backgroundColor: bgColor,
        color: '#fff',
      }}>{text}</Text>
    </TouchableOpacity>      
  );
};

export default Button;