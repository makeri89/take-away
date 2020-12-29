/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FoodItemList from './src/components/FoodComponents/FoodItemList';
import TabBar from './src/components/TabBar';
import UserPage from './src/components/LoginComponents/Userpage';

import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';


const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f0e1',
  },
  tab: {
    justifyContent: 'center',
  }
});

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <NavigationContainer>
          <Tab.Navigator
            sceneContainerStyle={styles.container}
            tabBar={props => <TabBar {...props} />}
          >
            <Tab.Screen 
              name='home' 
              component={FoodItemList}
              options={{
                title: 'Order food',
                tapBarLabel: 'Order food',
                tapBarAccessibilityLabel: 'Order food tab',
              }}
            />
            <Tab.Screen
              name='you'
              component={UserPage}
              options={{
                title: 'You',
                tapBarLabel: 'You',
                tapBarAccessibilityLabel: 'Login tab'
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
};

export default App;