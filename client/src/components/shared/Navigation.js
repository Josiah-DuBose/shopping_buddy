import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { ClickIcon } from '../shared';


const Navigation = ({navigator, navButtons, title}) => {
    let nav, selected, dropdown=true;
    const titleConfig = {
        title: title || 'Shopping Buddy',
        handler: () => navigator.navigate('App'),
    };

    // const leftIconClick = () => {
    //     navigator.goBack();
    // }

    const rightIconClick = () => {
        console.log("navigator", navigator)
        navigator.navigate('Profile');
    }

    const rightButtonConfig = <ClickIcon name="user" size={25} onPress={rightIconClick} />

    // const leftButtonConfig = <ClickIcon name="arrow-left" size={25} onPress={leftIconClick} />

    if (navButtons) {
        nav = <NavigationBar containerStyle={styles.navContainer} title={titleConfig} rightButton={rightButtonConfig}/>;
    } else {
        nav = <NavigationBar containerStyle={styles.navContainer} title={titleConfig}/>;
    }

    return (
        <React.Fragment>
            {nav}
        </React.Fragment>
    );

};

const styles = StyleSheet.create({
    navContainer: {
        backgroundColor: 'blue',
        maxWidth: '100%',
        padding: '2%',
        paddingBottom: '5%'
    }
});

export { Navigation }
