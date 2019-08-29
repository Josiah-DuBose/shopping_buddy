import React, { Component } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import { Loading, ListEntry } from '../components/shared';
import { Text } from 'react-native-elements';
import apiRequest from '../services/apiRequest';
import console = require('console');

export default class ListPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saving: false,
            loading: false,
            listId: this.props.navigation.state.params.listId,
            listName: this.props.navigation.state.params.listName,
            list: {items: []},
            itemUpdated: false
        };
        this.itemTotal = this.itemTotal.bind(this);
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

    itemTotal(bool) {
        let total = 0.00;
        const allItems = [].concat(...this.state.list.items.map(set => {
            if (bool) {
                return set.data.filter(item => item.done === true);
            } else {
                return set.data;
            }
        }));
        total = (allItems || []).reduce((total, item) => total + (item.price * item.qty), 0.00).toFixed(2);
        return total;
    };

    itemPress(item) {
        item.done = !item.done;
        this.setState({itemUpdated: !this.state.itemUpdated})
        console.log("item", item);
        this.itemTotal();
    }

    renderItem(item, index) {
        return  (
            <ListEntry item={item} index={index}
                onPress={() => this.itemPress(item)}
                edit={() => this.updateItem(item)}
            />
        );
    }

    render() {
        const {list, loading, itemUpdated} = this.state;
        return (
            <React.Fragment>
            {
                loading ? <Loading size={'large'} msg={'Loading list'} /> :
                <View>
                    <SectionList
                        style={styles.listsContainer}
                        renderItem={({item, index, section}) => this.renderItem(item, index)}
                        renderSectionHeader={({section: {title}}) => (
                            <Text style={styles.textHeader}>{title}</Text>
                        )}
                        sections={list.items}
                        keyExtractor={(item, index) => item + index}
                        extraData={itemUpdated}
                    />
                    <View style={styles.totalContainer}>
                        <Text style={styles.textHeader}>Done Total: ${this.itemTotal(true)}</Text>
                        <Text style={styles.textHeader}>List Total: ${this.itemTotal()}</Text>
                    </View>
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
    textHeader: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        paddingTop: '5%'
    },
    totalContainer: {

    }
});
