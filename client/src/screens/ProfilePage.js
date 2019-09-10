import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Card } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import { Loading, Input, Button } from '../components/shared';

export default class ProfilePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            loading: true
        }
        this.logout = this.logout.bind(this);
    }

    componentDidMount(){
        this.loadUser();
    }

    async loadUser() {
        this.setState({loading: true});
        const user = await AsyncStorage.getItem('userSession');
        this.setState({user: JSON.parse(user), loading: false});
    }

    async logout() {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userSession');
        await AsyncStorage.removeItem('userID');
        this.props.navigation.navigate('Auth');
    }

    render() {
        const {user, loading} = this.state;
        return (
            <View style={styles.container}>
            {loading ?
                <Loading size={'large'} msg={'Loading User Data'} /> :
                <React.Fragment>
                    <Card title={`${user.username}`}>
                        <View style={styles.userDataContainer}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: user.avatar }}
                            />
                            <Text style={styles.username}>username: {user.username}</Text>
                            <Text style={styles.username}>email: {user.email}</Text>
                        </View>
                    </Card>
                    <Button buttonText='Logout' onPress={this.logout}></Button>
                </React.Fragment>
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
    },
    userDataContainer: {
        paddingBottom: '1%',
    },
    username: {
        fontSize: 16
    },
    image: {},
});
