import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Loading, Input, Button, ClickIcon } from '../components/shared';
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
    }

    render() {
        const { lists, error, loading } = this.state;
        return (
            <React.Fragment>
                <View style={styles.container}>
                    {loading ?
                        <Loading size={'large'} msg={'Loading lists'} /> :
                        lists.map((list, index) => (
                            <ListItem key={index}
                                style={{
                                    borderWidth: 1,
                                    borderRadius: 2,
                                    borderColor: 'grey',
                                    marginBottom: 4
                                }}
                                title={list.name}
                                subtitle={list.store}
                                badge={{
                                    value: list.items.length,
                                    textStyle: { color: 'black' },
                                    badgeStyle: {
                                        backgroundColor: 'grey'
                                    }
                                }}
                                chevron={true}
                                onPress={() => this.props.navigation.navigate('List', {list})}
                            />
                        ))
                    }
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 275,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 1,
    },
    listsContainer: {
        marginTop: 150,
        borderWidth: 2,
        borderColor: 'grey',
        maxWidth: '100%'
    },
    item: {
        fontSize: 18,
        height: 44,
        textAlign: 'center',
    }
});
