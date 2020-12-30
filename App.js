/* eslint-disable react/no-children-prop */
/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FoodItemList from './src/components/FoodComponents/FoodItemList';
import TabBar from './src/components/TabBar';
import UserPage from './src/components/LoginComponents/Userpage';
import ShoppingCart from './src/components/ShoppingCart';

import { ApolloProvider } from '@apollo/react-hooks';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';
import ShoppingCartStorage from './src/utils/shoppingCartStorage';
import ShoppingCartStorageContext from './src/contexts/ShoppingCartStorageContext';

import theme from './src/theme/';

const authStorage = new AuthStorage();
const shoppingCartStorage = new ShoppingCartStorage();
const apolloClient = createApolloClient(authStorage);

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.appBackground,
  },
  tab: {
    justifyContent: 'center',
  }
});

const App = () => {
  /* This forcer state is an ugly brute-force way 
  to update components when an item 
  is added to the shopping cart */
  const [forcer, setForcer] = useState(0);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthStorageContext.Provider value={authStorage}>
        <ShoppingCartStorageContext.Provider value={shoppingCartStorage}>
          <NavigationContainer>
            <Tab.Navigator
              sceneContainerStyle={styles.container}
              tabBar={props => <TabBar {...props} />}
            >
              <Tab.Screen 
                name='home' 
                children={() => <FoodItemList setForcer={setForcer} />}
                options={{
                  title: 'Order food',
                  tapBarLabel: 'Order food',
                  tapBarAccessibilityLabel: 'Order food tab',
                }}
              />
              <Tab.Screen
                name='cart'
                children={() => <ShoppingCart forcer={forcer} setForcer={setForcer} />}
                options={{
                  title: 'Cart',
                  tapBarLabel: 'Cart',
                  tabBarAccessibilityLabel: 'Shopping cart tab'
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
        </ShoppingCartStorageContext.Provider>
      </AuthStorageContext.Provider>
    </ApolloProvider>
  );
};

export default App;