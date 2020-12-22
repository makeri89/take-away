import React from 'react';
import { View, StyleSheet } from 'react-native';

import FoodItemList from './FoodItemList';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f0e1'
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <FoodItemList />
        </View>
    );
};

export default Main;