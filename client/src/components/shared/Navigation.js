import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { ClickIcon } from '../shared';

const Navigation = ({navigator, navButtons}) => {
    let nav;
    const titleConfig = {
        title: 'Shopping Buddy',
        handler: () => navigator.navigate('App'),
    };

    const leftButtonConfig = {
        title: 'Back',
        handler: () => {
            alert('click');
        }
    };

    const rightIconClick = () => {
        alert('right clicked');
    }

    const rightButtonConfig = <ClickIcon name="user" size={25} onPress={rightIconClick} />

    if (navButtons) {
        nav = <NavigationBar title={titleConfig} leftButton={leftButtonConfig} rightButton={rightButtonConfig}/>;
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
        maxWidth: 350
    },

});

export { Navigation }
