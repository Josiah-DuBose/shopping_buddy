import React, { Component } from 'react';
import { StyleSheet, View, SectionList } from 'react-native';
import { Loading, ListEntry } from '../components/shared';
import { Text } from 'react-native-elements';
import apiRequest from '../services/apiRequest';
import Swipeout from 'react-native-swipeout';

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

    async removeItem(item) {
        this.setState({loading: true});
        const list = this.state.list;
        const setIndex = list.items.findIndex(ele => ele.title === item.section);
        const itemSet = list.items[setIndex];
        const itemIndex = itemSet.data.findIndex(ele => ele._id === item._id);
        
        // Remove item and set if set is empty.
        itemSet.data.splice(itemIndex, 1);
        if (!itemSet.data.length) {
            list.items.splice(setIndex, 1);
        }
        
        //Build list of item ids and make update to list.
        const items = ([].concat(...this.state.list.items.map(set => set.data))).map(ele => ele._id);
        try {
            const listOptions = {
                url: `lists/${this.state.listId}`,
                method: 'PUT',
                auth: true,
                body: {
                   items: items
                },
            };
            const resp = await apiRequest(listOptions);
            this.setState({list: resp});
        } catch(err) {
            alert(err)
        } finally {
            this.setState({loading: false});
        }
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

    async itemPress(item) {
        item.done = !item.done;
        this.setState({itemUpdated: !this.state.itemUpdated})
        this.itemTotal();
        // Update Item, TODO: abstract item save into service(save item is used in multiple places).
        try {
            const itemOptions = {
                url: `items/${item._id}`,
                method: 'PUT',
                auth: true,
                body: {
                    name: item.name,
                    price: item.price,
                    section: item.section,
                    qty: item.qty,
                    done: item.done
                },
            };
            await apiRequest(itemOptions);
        } catch(err) {
            alert(err)
        }
    }

    renderItem(item, index) {
        const swipeoutButtons = [
            {
                text: 'Delete',
                onPress: (() => this.removeItem(item)),
                backgroundColor: '#f44336'
            }
        ];
        return  (
            <Swipeout autoClose={true} right={swipeoutButtons}>
                <ListEntry item={item} index={index}
                    onPress={() => this.itemPress(item)}
                    edit={() => this.updateItem(item)}
                />
            </Swipeout>
           
        );
    }

    render() {
        const {list, loading, itemUpdated} = this.state;
        return (
            <React.Fragment>
            {
                loading ? <Loading size={'large'} msg={'Loading list'} /> :
                <View style={styles.container}>
                    { list.items.length? 
                        <SectionList
                            style={styles.listsContainer}
                            renderItem={({item, index, section}) => this.renderItem(item, index)}
                            renderSectionHeader={({section: {title}}) => (
                                <Text style={Object.assign({}, styles.textHeader, styles[title])}>{title}</Text>
                            )}
                            sections={list.items}
                            keyExtractor={(item, index) => item + index}
                            extraData={itemUpdated}
                        /> :
                        <Text style={styles.noItemsText}>No items yet, add one above.</Text>
                    }
                    { list.items.length ?
                        <View style={styles.totalContainer}>
                            <Text style={Object.assign({}, styles.totalText, styles.totalLeft)}>Done Total: ${this.itemTotal(true)}</Text>
                            <Text style={Object.assign({}, styles.totalText, styles.totalRight)}>List Total: ${this.itemTotal()}</Text> 
                        </View> :
                        null
                    }
                </View>
            }
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    listsContainer: {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#90a4ae',
        padding: 15,
    },
    noItemsText: {
        textAlign: 'center',
        fontSize: 20,
        padding: 2,
        fontWeight: 'bold',
        flexDirection: 'row',
    },
    'Dry Goods': {
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#90a4ae',
        backgroundColor: '#ff8a65'
    },
    totalContainer: {
        flexDirection: 'row',
    },
    totalText: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    totalLeft: {
        
    },
    totalRight: {
        marginLeft: '28%'
    }
});
