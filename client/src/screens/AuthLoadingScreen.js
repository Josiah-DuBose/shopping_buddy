import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loading } from '../components/shared';
import AsyncStorage from '@react-native-community/async-storage';
import apiRequest from '../services/apiRequest';

export default class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        this.fetchToken();
    }

    fetchToken = async () => {
        this.setState({loading: true});
        const userToken = await AsyncStorage.getItem('userToken');
        let authOk = false;
        if (userToken) {
            const options = {
                url: 'users/check-token',
                method: 'Post',
                body: {
                    token: userToken
                }
            };
            const response = await apiRequest(options);
            authOk = response.token;
        }
        this.setState({loading: false});
        this.props.navigation.navigate(authOk ? 'Home' : 'Auth');
    };

    render() {
        return (
            <View style={styles.container}>
                <Loading size={'large'} msg={'Loading app'}/>
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
