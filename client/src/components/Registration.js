import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Loading, Input, Button } from './shared';
import AsyncStorage from '@react-native-community/async-storage';


class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            password_confirmation: '',
            error: '',
            loading: false
        };
        this.confirmPass = this.confirmPass.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm() {
        if (!this.state.username || !this.state.password ||
            !this.state.password_confirmation || !this.state.email
        )
        {
            this.setState({error: 'Must fill in all fields.'});
            return;
        }

        this.setState({error: '', loading: true});

        const options = {
            url: 'users/create',
            method: 'POST',
            body: {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            },
        };

        try {
            const userSession = await apiRequest(options);
            if (userSession) {
                await AsyncStorage.setItem('userToken', userSession.token);
                delete userSession.token;
                await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
            }
            this.props.navigation.navigate('Home');
        } catch(err) {
            alert(err);
        } finally {
            this.setState({loading: false});
        }
    }

    confirmPass(password) {
        this.setState({ password_confirmation: password});
        if (password && this.state.password !== password) {
            this.setState({error: 'Passwords do not match.'});
        } else{
            this.setState({error: ''});
        }
    }

    render() {
        const {
            username, email, password, password_confirmation, error, loading
        } = this.state;
        return (
            <View style={styles.form}>
                <View style={styles.section}>
                    <Input
                        placeholder="Username"
                        label="Username"
                        value={username}
                        onChangeText={username => this.setState({ username })}
                    />
                </View>
                <View style={styles.section}>
                    <Input
                        placeholder="user@email.com"
                        label="Email"
                        value={email}
                        onChangeText={email => this.setState({ email })}
                    />
                </View>
                <View style={styles.section}>
                    <Input
                        secureTextEntry
                        placeholder="Password"
                        label="Password"
                        value={password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <View style={styles.section}>
                    <Input
                        secureTextEntry
                        placeholder="Confirm Password"
                        label="Confirm Password"
                        value={password_confirmation}
                        onChangeText={
                            (password_confirmation) => this.confirmPass(password_confirmation)
                        }
                    />
                </View>
                <Text style={styles.errorText}>
                    {error}
                </Text>
                { !loading ?
                    <Button buttonText='Register' onPress={this.submitForm}></Button> :
                    <Loading size={'large'} msg={'Creating user'}/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        width: '100%',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    section: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        backgroundColor: '#fff',
        borderColor: '#ddd',
    },
    errorText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    }
});

export { Registration }
