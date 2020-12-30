import React, { useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

import OrderList from './OrderList';
import Text from '../UIcomponents/Text';

import { useApolloClient, useQuery } from '@apollo/react-hooks';
import AuthStorageContext from '../../contexts/AuthStorageContext';
import { ME } from '../../graphql/queries';

const styles = StyleSheet.create({
  header: {
    textAlign: 'center'
  },
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  welcomeText: {
    paddingLeft: 30,
    marginTop: 20,
    marginBottom: -15
  }
});

const ProfilePage = ({ setIsLoggedIn }) => {
  const apolloClient = useApolloClient();
  const authStorage = useContext(AuthStorageContext);

  const { data } = useQuery(ME);

  const logOut = async () => {
    await authStorage.removeToken();
    setIsLoggedIn(false);
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <Text fontSize='header' style={styles.header}>Your profile</Text>
      <Text fontSize='subheading' style={styles.welcomeText}>{`Welcome ${data?.me.name}`}</Text>
      <OrderList customer={data?.me.username}/>
      <Button onPress={logOut} title='Log out' />
    </View>
  );
};

export default ProfilePage;