/* eslint-disable react/jsx-key */
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Text from './UIcomponents/Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 30,
    borderTopColor: '#cecece',
    borderTopWidth: 1,
    backgroundColor: '#f2f2f2'
  },
  tab: {
    flex: 1,
    alignItems: 'center'
  }
});

const TabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
          
        const isFocused = state.index === index;

        let iconName;

        if (route.name === 'home') {
          iconName = isFocused
            ? 'pizza' : 'pizza-outline';
        } else if (route.name === 'login') {
          iconName = isFocused
            ? 'log-in' : 'log-in-outline';
        } else if (route.name === 'profile') {
          iconName = isFocused
            ? 'person' : 'person-outline';
        }

        let tabColor = isFocused ? '#24b719' : '#555555';

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            key={index}
          >
            <Ionicons name={iconName} size={18} color={tabColor} />
            <Text style={{ color: tabColor, fontSize: 12 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;