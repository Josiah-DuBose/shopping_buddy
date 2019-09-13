import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loading } from './shared';
import { Input, Button, Text} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';

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

        const userSession = await apiRequest(options);
        if (userSession) {
            await AsyncStorage.setItem('userToken', userSession.token);
            await AsyncStorage.setItem('userID', userSession.id);
            delete userSession.token;
            delete userSession.id
            await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
            this.props.navigation.navigate('Home');
        }
        this.setState({loading: false});
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
                        leftIcon={<Entypo name={'user'} size={20} />}
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        placeholder="Username"
                        value={username}
                        onChangeText={username => this.setState({ username })}
                    />
                </View>
                <View style={styles.section}>
                    <Input
                        leftIcon={<Entypo name={'email'} size={20} />}
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        inputContainerStyle={styles.inputContainerStyle}
                        placeholder="Email"
                        value={email}
                        onChangeText={email => this.setState({ email })}
                    />
                </View>
                <View style={styles.section}>
                    <Input
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        leftIcon={<Entypo name={'lock'} size={20} />}
                        inputContainerStyle={styles.inputContainerStyle}
                        secureTextEntry
                        placeholder="Password"
                        value={password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <View style={styles.section}>
                    <Input
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        leftIcon={<Entypo name={'lock'} size={20} />}
                        inputContainerStyle={styles.inputContainerStyle}
                        secureTextEntry
                        placeholder="Confirm Password"
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
                    <Button buttonStyle={styles.button}
                        title='Register'
                        rounded={true}
                        icon={{name: 'add-user', type: 'entypo'}}
                        onPress={() => this.submitForm()}
                    /> :
                    <Loading size={'large'} msg={'Creating user'}/>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    form: {
        width: '96%',
        marginLeft: '2%',
        marginTop: '1%'
    },
    section: {
        flexDirection: 'row',
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderColor: '#90a4ae',
        maxWidth: '100%',
        marginTop: '1%',
        marginBottom: '1%'
    },
    leftIconContainerStyle: {
        paddingRight: '10%'
    },
    errorText: {
        alignSelf: 'center',
        fontSize: 18,
        color: 'red'
    },
    button: {
        maxWidth: '50%',
        backgroundColor: '#90a4ae',
        marginLeft: '25%',
    }
});

export { Registration }
