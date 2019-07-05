import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage } from 'react-native';
import { Loading } from '../components/shared';

export default class AuthLoadingScreen extends Component {
    constructor() {
        super();
        this.fetchToken();
    }

    fetchToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
  
    render() {
        return (
            <View style={styles.container}>
                <Loading size={'large'}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});