import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Loading, Input, Button, Navigation } from '../components/shared';
import AsyncStorage from '@react-native-community/async-storage';

export default class ListsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            error: '',
            loading: false,
        };
    }

    componentDidMount(){
        this.getLists();
    }

    async getLists() {
        this.setState({loading: true});
        const token = await AsyncStorage.getItem('userToken');
        try {
            //TODO Abstract all api methods into service.
            const response = await fetch('http://localhost:8550/api/v1/lists', {
                method: 'Get',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authroization: `Bearer ${token}`
                }
            });
            const json = await response.json();
            if (response.ok) {
                if (json && json.token) {
                    this.setState({lists: json})
                }
            } else {
                throw json;
            }
        } catch(err) {

            this.setState({error: err.detail});
            if (err.statusCode === 401) {
                this.props.navigation.navigate('Auth');
            }
        } finally {
            this.setState({loading: false});
        }
    }

    render() {
        const { lists, error, loading } = this.state;
        return (
            <React.Fragment>
                <Navigation navigator={this.props.navigation} backButton={false}/>
                {loading ? <Loading size={'large'} msg={'Loading lists'} /> :
                    <View style={styles.container}>
                        <Text style={styles.description}>Lists</Text>
                    </View>
                }
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        marginBottom: 450,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
    }
});
