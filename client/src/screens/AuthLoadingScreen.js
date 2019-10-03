import React, { Component } from 'react';
import { View } from 'react-native';
import { Loading } from '../components/shared';
import AsyncStorage from '@react-native-community/async-storage';
import userService from '../services/userService';
import { withTheme } from 'react-native-elements';

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            theme: this.props.theme
        };
    }

    componentDidMount() {
        this.fetchToken();
    }

    async fetchToken() {
        this.setState({loading: true});
        const userToken = await AsyncStorage.getItem('userToken');
        let authOk = false;
        if (userToken) {
            authOk = await userService.checkToken(userToken);
        }
        this.setState({loading: false});
        this.props.navigation.navigate(authOk ? 'Home' : 'Auth');
    };

    render() {
        const { theme } = this.state;
        return (
            <View style={theme.loadingContainer}>
                <Loading size={'large'} msg={'Loading Shopping Buddy'}/>
            </View>
        );
    }
}

export default withTheme(AuthLoadingScreen);