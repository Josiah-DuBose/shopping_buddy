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

    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem title={item.name}
            style={{
                borderWidth: 1,
                borderRadius: 2,
                borderColor: 'grey',
                marginBottom: 4
            }}
            checkmark={item.done}
            onPress={() => {
                item.done = !item.done;
                this.setState({itemUpdated: !this.state.itemUpdated})
            }}
            leftIcon={
                <ClickIcon styles={{ marginRight: 15}}
                name="edit"
                size={25}
                onPress={() => this.updateItem(item)}/>
            }
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
