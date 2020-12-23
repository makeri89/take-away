/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import FoodItemList from './src/components/FoodItemList';
import LoginForm from './src/components/LoginForm';
import TabBar from './src/components/TabBar';

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
          name='login'
          component={LoginForm}
          options={{
            title: 'Login',
            tapBarLabel: 'Login',
            tapBarAccessibilityLabel: 'Login tab'
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;