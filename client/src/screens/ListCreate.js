import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';
import apiRequest from '../services/apiRequest';

export default class ListCreate extends Component {
    constructor(props) {
        super(props);
        const newList = {
            name: '',
            store: '',
        };
        this.state = {
            saving: false,
            list: this.props.navigation.state.params && this.props.navigation.state.params.list ?
                this.props.navigation.state.params.list : newList,
            create: !(this.props.navigation.state.params && this.props.navigation.state.params.list)
        };
        this.saveList = this.saveList.bind(this);
    }

    async saveList() {
        this.setState({saving: true});
        const create = this.state.create;
        const list = this.state.list;
        const listOptions = {
            url: create ? `lists/create` : `lists/${list._id}`,
            method: create ? 'POST' : 'PUT',
            auth: true,
            user: true,
            body: {
                name: list.name,
                store: list.store
            }
        };
        
        await apiRequest(listOptions);
        this.setState({saving: false});
        this.props.navigation.push('Lists');
    }

    render() {
        const { saving, list } = this.state;
        return ( // TODO: abstract into Input Component
            <View style={styles.container}>
                <Input
                    placeholder={'Enter list name'}
                    value={list.name}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    onChangeText={name =>
                        this.setState(state => {
                          return {
                            ...state,
                            list: {
                                ...state.list,
                                name: name
                            }
                          };
                        })
                    }
                    leftIcon={<Entypo name={'edit'} size={20} />}
                />
                <Input
                    placeholder={'Enter store name'}
                    value={list.store}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    onChangeText={store =>
                        this.setState(state => {
                          return {
                            ...state,
                            list: {
                                ...state.list,
                                store: store
                            }
                          };
                        })
                    }
                    leftIcon={<Entypo name={'shopping-bag'} size={20} />}
                />
                <Button buttonStyle={styles.button}
                    icon={{name: 'save', type: 'entypo'}}
                    title='Save List'
                    loadingRight={saving}
                    rounded={true}
                    onPress={() => this.saveList(this.state.list)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 275,
        padding: 5,
        borderWidth: 1,
        borderColor: 'grey',
        maxWidth: '90%',
        marginLeft: '5%',
        marginTop: '5%'
    },
    leftIconContainerStyle: {
        paddingRight: '10%'
    },
    inputContainerStyle: {
        borderWidth: 1,
        borderColor: 'grey',
        maxWidth: '100%',
        marginTop: '1%',
        marginBottom: '1%'
    },
    button: {
        maxWidth: '50%',
        backgroundColor: 'grey',
        marginLeft: '25%',
    }
});