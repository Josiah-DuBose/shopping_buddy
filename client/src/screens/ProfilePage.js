import React, { Component } from 'react';
import { Card, Button, withTheme, Input } from 'react-native-elements';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Loading } from '../components/shared';
import Entypo from 'react-native-vector-icons/Entypo';
import userService from '../services/userService';

class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true,
            saving: false,
            currentUsername: null,
            theme: this.props.theme
        }
        this.logout = this.logout.bind(this);
        this.saveUser = this.saveUser.bind(this);
    }

    componentDidMount(){
        this.loadUser();
    }

    async loadUser() {
        this.setState({loading: true});
        const user = JSON.parse(await AsyncStorage.getItem('userSession'));
        this.setState({user: user, currentUsername: user.username, loading: false});
    }

    async saveUser() {
        this.setState({saving: true});
        const userId = await await AsyncStorage.getItem('userID');
        const { user } = this.state;
        await userService.saveUser('update', user, userId);
        this.setState({currentUsername: user.username});
        this.setState({saving: false});
    }

    async logout() {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userSession');
        await AsyncStorage.removeItem('userID');
        this.props.navigation.navigate('Auth');
    }

    render() {
        const {user, currentUsername, loading, saving, theme} = this.state;
        return (
            <React.Fragment>
            { loading ?
                <Loading size={'large'} msg={'Loading User Data'} /> :
                <Card title={`User: ${currentUsername}`}>
                    <Input
                        leftIcon={<Entypo name={'user'} size={20} />}
                        leftIconContainerStyle={theme.leftInputIconContainerStyle}
                        inputContainerStyle={theme.inputContainerStyle}
                        placeholder="Username"
                        disabled={saving}
                        value={user.username}
                        onChangeText={username => this.setState(state => {
                          return {
                            ...state,
                            user: {
                                ...state.user,
                                username: username
                            }
                          };
                        })}
                    />
                    <Input
                        leftIcon={<Entypo name={'email'} size={20} />}
                        leftIconContainerStyle={theme.leftInputIconContainerStyle}
                        inputContainerStyle={theme.inputContainerStyle}
                        placeholder="Email"
                        disabled={saving}
                        value={user.email}
                        onChangeText={email =>  this.setState(state => {
                          return {
                            ...state,
                            user: {
                                ...state.user,
                                email: email
                            }
                          };
                        })}
                    />
                    <View style={theme.multiButtonContainer}>
                        <Button buttonStyle={Object.assign({}, theme.basicButton, theme.leftFormButton)}
                            title='Save Profile'
                            rounded={true}
                            disabled={saving}
                            loading={saving}
                            onPress={() => this.saveUser()}
                        />
                        <Button buttonStyle={Object.assign({}, theme.basicButton, theme.rightFormButton)}
                            title='Logout'
                            rounded={true}
                            onPress={() => this.logout()}
                        />
                    </View>
                </Card>
            }
            </React.Fragment>
        );
    }
}

export default withTheme(ProfilePage);
