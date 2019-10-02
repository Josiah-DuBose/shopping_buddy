import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, withTheme } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import apiRequest from '../services/apiRequest';

class ItemPage extends Component {
    constructor(props) {
        super(props)
        const newItem = {
            price: '',
            name: '',
            section: '',
            qty: '',
        }

        this.state = {
            saving: false,
            item: this.props.navigation.state.params && this.props.navigation.state.params.item ?
                this.props.navigation.state.params.item : newItem,
            listId:  this.props.navigation.state.params.listId,
            listName: this.props.navigation.state.params.listName,
            create: !(this.props.navigation.state.params && this.props.navigation.state.params.item),
            theme: this.props.theme
        };
        this.saveItem = this.saveItem.bind(this);
    }

    async saveItem(item) {
        this.setState({item: item, saving: true});
        const create = this.state.create;
        try {
            const itemOptions = {
                url: create ? `items/create` : `items/${item._id}`,
                method: create ? 'POST' : 'PUT',
                auth: true,
                user: true,
                body: {
                    name: item.name,
                    price: item.price,
                    section: item.section,
                    qty: item.qty
                },
            };
            const itemResp = await apiRequest(itemOptions);

            // Add item to list if action was a create.
            if (itemResp && create) {
                const listOptions = {
                    url: `lists/${this.state.listId}`,
                    method: 'PUT',
                    auth: true,
                    body: {
                       newItem: itemResp._id
                    },
                };
                await apiRequest(listOptions);
            }
            this.props.navigation.navigate('List', {listId: this.state.listId, listName: this.state.listName});
        } catch(err) {
            alert(err);
        } finally {
            this.setState({saving: false});
        }
    }

    render() {
        const { saving, item, theme } = this.state;
        return (
            <View style={theme.container}>
                <Input
                    placeholder={'Enter item name'}
                    value={item.name}
                    leftIconContainerStyle={theme.leftInputIconContainerStyle}
                    inputContainerStyle={theme.inputContainerStyle}
                    onChangeText={name =>
                        this.setState(state => {
                          return {
                            ...state,
                            item: {
                                ...state.item,
                                name: name
                            }
                          };
                        })
                    }
                    leftIcon={<Entypo name={'edit'} size={20} />}
                />
                <Input
                    placeholder={'Enter item price'}
                    value={`${item.price}`}
                    keyboardType={'number-pad'}
                    leftIconContainerStyle={theme.leftInputIconContainerStyle}
                    inputContainerStyle={theme.inputContainerStyle}
                    onChangeText={price =>
                        this.setState(state => {
                          return {
                            ...state,
                            item: {
                                ...state.item,
                                price: price
                            }
                          };
                        })
                    }
                    leftIcon={<Entypo name={'price-tag'} size={20} />}
                />
                <Input
                    placeholder={'Enter item section'}
                    value={item.section}
                    leftIconContainerStyle={theme.leftInputIconContainerStyle}
                    inputContainerStyle={theme.inputContainerStyle}
                    onChangeText={section =>
                        this.setState(state => {
                          return {
                            ...state,
                            item: {
                                ...state.item,
                                section: section
                            }
                          };
                        })
                    }
                    leftIcon={<Entypo name={'shopping-cart'} size={20} />}
                />
                <Input
                    placeholder={'Enter item Qty'}
                    value={`${item.qty}`}
                    keyboardType={'number-pad'}
                    leftIconContainerStyle={theme.leftInputIconContainerStyle}
                    inputContainerStyle={theme.inputContainerStyle}
                    onChangeText={qty =>
                        this.setState(state => {
                          return {
                            ...state,
                            item: {
                                ...state.item,
                                qty: qty
                            }
                          };
                        })
                    }
                    leftIcon={<Entypo name={'calculator'} size={20} />}
                />
                <Button buttonStyle={theme.formButton}
                    icon={{name: 'save', type: 'entypo'}}
                    title='Save Item'
                    loadingRight={saving}
                    rounded={true}
                    onPress={() => this.saveItem(this.state.item)}
                />
            </View>
        )
    }

}

export default withTheme(ItemPage);
