import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Loading, Input, Button } from './shared';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password_confirmation: '',
            error: '',
            loading: false
        };
    }

    submitForm() {
        console.log("press");
    }

    render() {
        const { email, password, password_confirmation, error, loading } = this.state;
        return (
            <View style={styles.form}>
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
                        placeholder="password"
                        label="Password"
                        value={password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <View style={styles.section}>
                    <Input
                        secureTextEntry
                        placeholder="confirm password"
                        label="Confirm Password"
                        value={password_confirmation}
                        onChangeText={password_confirmation => this.setState({ password_confirmation })}
                    />
                </View>
                <Text style={styles.errorText}>
                    {error}
                </Text>
                { !loading ?
                    <Button buttonText='Register' onPress={this.submitForm}></Button> :
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

export { Registration }
