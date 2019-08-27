import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Loading, ListEntry, ClickIcon } from '../components/shared';
import { ListItem } from 'react-native-elements'

export default class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saving: false,
            list: this.props.navigation.state.params.list,
            itemUpdated: false
        };
    }

    updateItem(item) {
        console.log("edit", item);
        this.props.navigation.navigate('Item', {item})
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
        const {saving, list, itemUpdated} = this.state;
        return (
            <FlatList
                style={styles.listsContainer}
                keyExtractor={this.keyExtractor}
                data={list.items}
                renderItem={this.renderItem}
                extraData={itemUpdated}
            />
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
