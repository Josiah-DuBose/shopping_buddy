import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Loading, Input, Button, Navigation } from '../components/shared';
import AsyncStorage from '@react-native-community/async-storage';
import apiRequest from '../services/apiRequest';

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
        const lists = await apiRequest({url: 'lists', method:'Get', auth: true});
        this.setState({lists: lists, loading: false});
        console.log("this.state.lists", this.state.lists);
    }

    render() {
        const { lists, error, loading } = this.state;
        return (
            <React.Fragment>
                <Navigation navigator={this.props.navigation} backButton={false}/>
                <View style={styles.container}>
                    {loading ?
                        <Loading size={'large'} msg={'Loading lists'} /> :
                        <Text style={styles.description}>Lists</Text>
                    }
                </View>
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
        marginBottom: 275,
        padding: 30,
    }
});
