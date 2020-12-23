/* eslint-disable react/display-name */
import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native.js';

import FoodItemList from './src/components/FoodComponents/FoodItemList';
import TabBar from './src/components/TabBar';
import LoginPage from './src/components/LoginComponents/LoginPage';
import ProfilePage from './src/components/UserComponents/ProfilePage';
import { object } from 'yup';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f0e1',
  },
  tab: {
    justifyContent: 'center',
  }
});

// Parse.setAsyncStorage(AsyncStorage);
// Parse.initialize('FuPEOdbGdHTrFZFjdgadvwcGEXBkQx1wd10eVl6e', 'LkZctSGGMlX6xOi8H2hKKRtRH5eX4XmBvagRTG2e');
// Parse.serverURL = 'https://parseapi.back4app.com/';

const App = () => {

  const [user, setUser] = useState(false);

  // const MyFirstClass = Parse.Object.extend('MyFirstClass');
  // const myFirstClass = new MyFirstClass();

  // myFirstClass.set('name', 'I am able to save objects!');
  // myFirstClass.save()
  //   .then((object) => {
  //     alert('New object created');
  //   }, (error) => {
  //     alert('Failed');
  //   });

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
  );
};

export default App;