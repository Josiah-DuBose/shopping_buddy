import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loading } from '../components/shared';
import AsyncStorage from '@react-native-community/async-storage';

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.fetchToken();
    }

    fetchToken = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        let authOk = false;
        if (userToken) {
            try {
                const response = await fetch('http://localhost:8550/api/v1/users/check-token', {
                    method: 'Post',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: userToken
                    })
                });
                const json = await response.json();

                if (response.ok) {
                    authOk = json.token;
                } else {
                    throw json;
                }
            } catch(err) {
                console.log("error", err);
            }
        }
        this.props.navigation.navigate(authOk ? 'App' : 'Auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <Loading size={'large'} msg={'Loading'}/>
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
