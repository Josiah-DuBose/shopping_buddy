import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Text, Button, withTheme} from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';
import userService from '../services/userService';

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
        const success = await userService.login({
            username: this.state.username,
            password: this.state.password
        });
        this.setState({loading: false});
        if (success) {
            this.props.navigation.navigate('Home');
        }
    }

    render() {
        const { username, password, error, loading, theme } = this.state;
        return (
            <View>
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
                <Button buttonStyle={Object.assign({}, theme.basicButton, theme.centeredButton)}
                    title='Login'
                    rounded={true}
                    icon={{name: 'login', type: 'entypo'}}
                    loading={loading}
                    disabled={loading}
                    onPress={() => this.submitForm()}
                />
            </View>
        );
    }

}

export default withTheme(Login);
