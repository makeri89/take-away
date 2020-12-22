import React from 'react';
import { View } from 'react-native';
import Text from './UIcomponents/Text';

const NavBar = () => {
  const text = 'Hello';
  
  return (
    <View>
      <Text>{text}</Text>
    </View>
  );
};

export default NavBar;