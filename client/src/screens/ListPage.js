import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Loading, ListEntry } from '../components/shared';
import { ListItem } from 'react-native-elements'

export default class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saving: false,
            list: this.props.navigation.state.params.list
        };
    }

    render() {
        const {saving, list} = this.state;
        return (
            <View>
            {saving ? <Loading size={'large'} msg={'Loading Items'}/> :
                list['items'].map((item, index) => (
                    <ListEntry item={item} index={index} />
                ))
            }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'

    }
});
