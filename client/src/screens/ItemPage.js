import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Loading, ListEntry, ClickIcon } from '../components/shared';
import { ListItem } from 'react-native-elements'

export default class ItemPage extends Component {
    constructor(props) {
        super(props)
        const newItem = {
            price: 0.00,
            name: '',
            section: '',
            qty: 1,
            done: false
        }

        this.state = {
            saving: false,
            item: this.props.navigation.state.params && this.props.navigation.state.params.item ?
                this.props.navigation.state.params.item : newItem
        };
        console.log("this.state item",this.state);
    }

    render() {
        const { saving, item } = this.state;
        return (
            <View style={styles.container}>

            </View>
        )
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
    }
});
