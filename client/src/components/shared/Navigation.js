import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';

const Navigation = ({navigator, backButton}) => {
    console.log("navigator", navigator)
    let nav;
    const titleConfig = {
        title: 'Shopping Buddy',
        handler: () => navigator.navigate('Lists'),
    };
    const leftButtonConfig = {
        title: 'Back',
        handler: () => alert('click')
    };

    if (backButton) {
        nav = <NavigationBar title={titleConfig} leftButton={leftButtonConfig}/>;
    } else {
        nav = <NavigationBar title={titleConfig}/>;
    }

    return (
        <View style={styles.container}>
            {nav}
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export { Navigation }
