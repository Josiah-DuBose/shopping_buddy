import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Loading } from './shared';
import { Input, Text, Button} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import apiRequest from '../services/apiRequest';

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

        this.setState({error: '', loading: true});
        const options = {
            url: 'users/login',
            method: 'POST',
            body: {
                username: this.state.username,
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
            this.setState({loading: false});
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        const { username, password, error, loading } = this.state;
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
                        leftIconContainerStyle={styles.leftIconContainerStyle}
                        leftIcon={<Entypo name={'lock'} size={20} />}
                        inputContainerStyle={styles.inputContainerStyle}
                        secureTextEntry
                        placeholder="Password"
                        value={password}
                        onChangeText={password => this.setState({ password })}
                    />
                </View>
                <Text style={styles.errorText}>
                    {error}
                </Text>
                { !loading ?
                    <Button buttonStyle={styles.button}
                        title='Login'
                        rounded={true}
                        icon={{name: 'login', type: 'entypo'}}
                        onPress={() => this.submitForm()}
                    /> :
                    <Loading size={'large'} msg={'Logging in'}/>
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

export { Login }
