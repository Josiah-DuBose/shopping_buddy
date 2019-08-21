import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Loading, Input, Button } from '../components/shared';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true
        }
        this.loadUser();
    }

    async loadUser() {
        this.setState({loading: true});
        const user = await AsyncStorage.getItem('userSession');
        this.setState({user: user, loading: false});
    }

    render() {
        const {user, loading} = this.state;
        return (
            <View style={styles.container}>
            {loading ?
                <Loading size={'large'} msg={'Loading User Data'} /> :
                console.log("user", user)
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    }
});
