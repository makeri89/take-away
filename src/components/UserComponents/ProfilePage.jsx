import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import OrderList from './OrderList';
import Text from '../UIcomponents/Text';

const styles = StyleSheet.create({
  header: {
    textAlign: 'center'
  },
  container: {
    paddingTop: Constants.statusBarHeight
  }
});

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <Text fontSize='header' style={styles.header}>Your profile</Text>
      <OrderList />
    </View>
  );
};

export default ProfilePage;