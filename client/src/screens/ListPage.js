import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Loading, ListEntry, ClickIcon } from '../components/shared';
import { ListItem } from 'react-native-elements';
import apiRequest from '../services/apiRequest';

export default class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saving: false,
            loading: false,
            listId: this.props.navigation.state.params.listId,
            listName: this.props.navigation.state.params.listName,
            list: {},
            itemUpdated: false,
        };
    }

    componentDidMount(){
        this.getList();
    }

    async getList() {
        this.setState({loading: true});
        const list = await apiRequest({url: `lists/${this.state.listId}`, method:'Get', auth: true});
        this.setState({list: list, loading: false});
    }

    updateItem(item) {
        this.props.navigation.navigate(
            'Item',
            {
                item: item,
                listId: this.state.listId,
                listName: this.state.listName
            }
        );
    }

    itemPress(item) {
        item.done = !item.done;
        this.setState({itemUpdated: !this.state.itemUpdated})
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListEntry item={item}
            onPress={() => this.itemPress(item)}
            edit={() => this.updateItem(item)}
        />
    )

    render() {
        const {saving, loading, listId, list, itemUpdated} = this.state;
        return (
            <React.Fragment>
            {
                loading ? <Loading size={'large'} msg={'Loading list'} /> :
                <View>
                    <FlatList
                        style={styles.listsContainer}
                        keyExtractor={this.keyExtractor}
                        data={list.items}
                        renderItem={this.renderItem}
                        extraData={itemUpdated}
                    />
                    <Text>{list.total}</Text>
                </View>
            }
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    listsContainer: {
        maxWidth: '90%',
        marginLeft: '5%',
        marginTop: '4%'
    },
});
