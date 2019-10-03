import React, { Component } from 'react';
import { View } from 'react-native';
import { Input, Button, Text, withTheme} from 'react-native-elements';
import userService from '../services/userService';
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
            loading: false,
            theme: this.props.theme
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
        const success = await userService.saveUser('create', {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        });
        this.setState({loading: false});
        
        if (success) {
            this.props.navigation.navigate('Home');
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
        const { username, email, password, password_confirmation, error, loading, theme } = this.state;
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
                    leftIcon={<Entypo name={'email'} size={20} />}
                    leftIconContainerStyle={theme.leftInputIconContainerStyle}
                    inputContainerStyle={theme.inputContainerStyle}
                    placeholder="Email"
                    value={email}
                    onChangeText={email => this.setState({ email })}
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
                <Input
                    leftIcon={<Entypo name={'lock'} size={20} />}
                    leftIconContainerStyle={theme.leftInputIconContainerStyle}
                    inputContainerStyle={theme.inputContainerStyle}
                    secureTextEntry
                    placeholder="Confirm Password"
                    value={password_confirmation}
                    onChangeText={
                        (password_confirmation) => this.confirmPass(password_confirmation)
                    }
                />
                <Text style={theme.errorText}>
                    {error}
                </Text>
                <Button buttonStyle={Object.assign({}, theme.basicButton, theme.centeredButton)}
                    title='Register'
                    rounded={true}
                    loading={loading}
                    disabled={loading}
                    icon={{name: 'add-user', type: 'entypo'}}
                    onPress={() => this.submitForm()}
                /> 
            </View>
        );
    }
}

export default withTheme(Registration);
