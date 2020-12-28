/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FoodItemList from './src/components/FoodComponents/FoodItemList';
import TabBar from './src/components/TabBar';
import LoginPage from './src/components/LoginComponents/LoginPage';
import ProfilePage from './src/components/UserComponents/ProfilePage';

import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from './src/utils/apolloClient';

const apolloClient = createApolloClient();

// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://192.168.100.40:4000/graphql',
//   cache: new InMemoryCache()
// });

// client.query({
//   query: gql`
//     query allProducts {
//       name
//       price
//     }
//   `
// }).then(result => console.log(result));

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

  // const [user, setUser] = useState(false);

  return (
    <ApolloProvider client={apolloClient}>
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
  {/* TODO show profile or login tab depending on if user is logged in*/}
            <Tab.Screen
            name='login'
            component={LoginPage}
            options={{
              title: 'Login',
              tapBarLabel: 'Login',
              tapBarAccessibilityLabel: 'Login tab'
            }}
          />
        
          <Tab.Screen
            name='profile'
            component={ProfilePage}
            options={{
              title: 'Profile',
              tapBarLabel: 'Profile',
              tabBarAccessibilityLabel: 'Profile tab'
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;