import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Loading, Input, Button } from './shared';
import AsyncStorage from '@react-native-community/async-storage';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
            loading: false
        };
        this.submitForm = this.submitForm.bind(this);
    }

    async submitForm() {
        if (!this.state.username || !this.state.password) {
            this.setState({error: 'Must enter password and username'});
            return;
        }
        this.setState({error: ''});
        try {
            const response = await fetch('http://localhost:8550/api/v1/users/login', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password
                }),
            });
            const json = await response.json();

            if (response.ok) {
                if (json && json.token) {
                    AsyncStorage.setItem('userToken', json.token);
                    this.props.navigation.navigate('Lists');
                }
            } else {
                throw json;
            }

        } catch(err) {
            this.setState({error: err.detail});
        }
    }

    render() {
        const { username, password, error, loading } = this.state;
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
                        secureTextEntry
                        placeholder="Password"
                        label="Password"
                        value={password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <Text style={styles.errorText}>
                    {error}
                </Text>
                { !loading ?
                    <Button buttonText='Login' onPress={this.submitForm}></Button> :
                    <Loading size={'large'} />
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

export { Login }
