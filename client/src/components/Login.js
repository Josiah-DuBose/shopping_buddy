import React, { Component } from 'react';
import { View } from 'react-native';
import { Loading } from './shared';
import { Input, Text, Button, withTheme} from 'react-native-elements';
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
            loading: false,
            theme: this.props.theme
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
        const { username, password, error, loading, theme } = this.state;
        return (
            <View style={theme.container}>
                <Input
                    leftIcon={<Entypo name={'user'} size={20} />}
                    leftIconContainerStyle={theme.leftInputIconContainerStyle}
                    inputContainerStyle={theme.inputContainerStyle}
                    placeholder="Username"
                    value={username}
                    onChangeText={username => this.setState({ username })}
                />
                <Input
                    leftIcon={<Entypo name={'lock'} size={20} />}
                    leftIconContainerStyle={theme.leftInputIconContainerStyle}
                    inputContainerStyle={theme.inputContainerStyle}
                    secureTextEntry
                    placeholder="Password"
                    value={password}
                    onChangeText={password => this.setState({ password })}
                />
                <Text style={theme.errorText}>
                    {error}
                </Text>
                { !loading ?
                    <Button buttonStyle={theme.formButton}
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

export default withTheme(Login);
