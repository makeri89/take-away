import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import OrderList from './OrderList';
import Text from '../UIcomponents/Text';
import Button from '../UIcomponents/Button';

import { useApolloClient, useQuery } from '@apollo/react-hooks';
import AuthStorageContext from '../../contexts/AuthStorageContext';
import { ME } from '../../graphql/queries';

import theme from '../../theme';

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
  },
  logout: {
    marginHorizontal: 100
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
      <Button 
        onPress={logOut} 
        text='Log out' 
        color={theme.colors.error}
        style={styles.logout}
      />
    </View>
  );
};

export default ProfilePage;