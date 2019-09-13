import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements'
import { Loading } from '../components/shared';
import apiRequest from '../services/apiRequest';
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
        const userID = await AsyncStorage.getItem('userID');
        const lists = await apiRequest({url: `lists/by-user/${userID}`, method:'Get', auth: true});
        this.setState({lists: lists, loading: false});
    }

    render() {
        const { lists, loading } = this.state;
        return (
            <React.Fragment>
                <View style={styles.container}>
                    {loading ?
                        <Loading size={'large'} msg={'Loading lists'} /> :
                        lists && lists.length ?
                        lists.map((list, index) => (
                            <ListItem key={index}
                                style={styles.listsContainer}
                                title={list.name}
                                subtitle={list.store}
                                badge={{
                                    value: ([].concat(...list.items.map(set => set.data))).length,
                                    textStyle: { color: 'black' },
                                    badgeStyle: {
                                        backgroundColor: 'grey'
                                    }
                                }}
                                chevron={true}
                                onPress={() => this.props.navigation.navigate('List', {listId: list._id, listName: list.name})}
                            />
                        )) :
                        <Text style={styles.textHeader}>No Lists yet, add one above.</Text>
                    }
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    listsContainer: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: 'grey',
        paddingBottom: 5
    },
    item: {
        fontSize: 18,
        height: 44,
        textAlign: 'center',
    },
    textHeader: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: '5%'
    }
});
