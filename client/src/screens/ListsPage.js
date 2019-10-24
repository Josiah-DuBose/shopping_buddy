import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem, withTheme } from 'react-native-elements'
import { Loading, NothingHere } from '../components/shared';
import apiRequest from '../services/apiRequest';
import AsyncStorage from '@react-native-community/async-storage';
import Swipeout from 'react-native-swipeout';

class ListsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lists: [],
            error: '',
            loading: false,
            theme: this.props.theme
        };

        this.removeList = this.removeList.bind(this);
        this.getLists = this.getLists.bind(this);
        this.updateList = this.updateList.bind(this);
    }

    componentDidMount(){
        this._subscribe = this.props.navigation.addListener('didFocus', () => {
            this.getLists();
        });
    }

    async getLists() {
        this.setState({loading: true});
        const userID = await AsyncStorage.getItem('userID');
        const lists = await apiRequest({url: `lists/by-user/${userID}`, method:'Get', auth: true});
        this.setState({lists: lists, loading: false});
    }

    async removeList(list) {
        this.setState({loading: true});
        await apiRequest({url: `lists/${list.id}`, method:'Delete', auth: true});
        await this.getLists();
    }

    updateList(list) {
        this.props.navigation.navigate('ListCreate', { list: list });
    }

    renderListItem(list, index) {
        const { theme } = this.state;
        const swipeoutButtons = [
            {
                text: 'Delete',
                onPress: (() => this.removeList(list)),
                backgroundColor: theme.colors.lightRed
            },
            {
                text: 'Edit',
                onPress: (() => this.updateList(list)),
                backgroundColor: theme.colors.lightGrey
            }
        ];

        return (
            <Swipeout key={index} autoClose={true} right={swipeoutButtons}>
                <ListItem key={index}
                    style={theme.listContainer} 
                    title={list.name}
                    subtitle={list.storeName}
                    badge={{
                        value: `Items: ${([].concat(...list.items.map(set => set.data))).length}`,
                        textStyle: { color: theme.colors.black },
                        badgeStyle: {
                            backgroundColor: theme.colors.lightGrey
                        }
                    }}
                    chevron={true}
                    onPress={() => this.props.navigation.navigate('List', {listId: list.id, listName: list.name})}
                />
            </Swipeout>
        );
    }

    render() {
        const { lists, loading, theme } = this.state;
        return (
            <React.Fragment>
                <View style={theme.container}>
                    {loading ?
                        <Loading size={'large'} msg={'Loading lists'} /> :
                        lists && lists.length ?
                        lists.map((list, index) => (this.renderListItem(list, index))):
                        <NothingHere label={'lists'} />
                    }
                </View>
            </React.Fragment>
        );
    }
}

export default withTheme(ListsPage);
