import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';

const Navigation = () => {
    return (
        <View style={styles.container}>
            <NavigationBar
                title={titleConfig}
                leftButton={leftButtonConfig}
            />
        </View>
    );

};

const leftButtonConfig = {
  title: 'Back',
  handler: () => alert('click'),
};

const titleConfig = {
  title: 'ShoppingBuddy',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export { Navigation }
