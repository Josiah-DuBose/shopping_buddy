import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, withTheme, Text, Divider } from 'react-native-elements';
import { Loading, Maps } from '../components/shared';
import Entypo from 'react-native-vector-icons/Entypo';
import apiRequest from '../services/apiRequest';
import * as _ from 'lodash';

class ListCreate extends Component {
    constructor(props) {
        super(props);
        const newList = {
            name: '',
            store: '',
        };
        this.state = {
            saving: false,
            loading: false,
            list: this.props.navigation.state.params && this.props.navigation.state.params.list ?
                this.props.navigation.state.params.list : newList,
            create: !(this.props.navigation.state.params && this.props.navigation.state.params.list),
            theme: this.props.theme,
            position: {},
            searchResults: []
        };
        this.saveList = this.saveList.bind(this);
        this.searchStore = this.searchStore.bind(this);
    }

    componentDidMount(){
        this.setState({loading: true});
        this.getLocation();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            position => {
                this.setState({
                    position: {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude
                    },
                    loading: false
                });
            }
        );
    }

    async searchStore() {
        console.log("state", this.state);
        this.setState({saving: true});
        const store = this.state.list.store;
        const latitude = this.state.position.latitude;
        const longitude = this.state.position.longitude;
        const searchOptions = {
            url: `stores/find/${store}/${latitude}/${longitude}`,
            method: 'GET',
            auth: true
        }

        const response = await apiRequest(searchOptions);
        console.log("response", response);
        this.setState({saving: false, searchResults: response});
    }

    async saveList() {
        this.setState({saving: true});
        const create = this.state.create;
        const list = this.state.list;
        const listOptions = {
            url: create ? `lists/create` : `lists/${list.id}`,
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
        const { saving, loading, list, theme, position, searchResults } = this.state;
        return (
            <React.Fragment>
                { loading ? <Loading size={'large'} msg={'Loading list'} /> :
                <React.Fragment>
                    <View style={theme.container}>
                        <Input
                            placeholder={'Enter list name'}
                            value={list.name}
                            leftIconContainerStyle={theme.leftInputIconContainerStyle}
                            inputContainerStyle={theme.inputContainerStyle}
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
                            leftIconContainerStyle={theme.leftInputIconContainerStyle}
                            inputContainerStyle={theme.inputContainerStyle}
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
                    </View>
                    <View style={theme.multiButtonContainer}>
                        <Button buttonStyle={Object.assign({}, theme.basicButton, theme.leftFormButton)}
                            icon={{name: 'map', type: 'entypo'}}
                            title='Search Stores'
                            rounded={true}
                            disabled={saving}
                            loading={saving}
                            onPress={this.searchStore}
                        />
                        <Button buttonStyle={Object.assign({}, theme.basicButton, theme.centeredButton)}
                            icon={{name: 'save', type: 'entypo'}}
                            title='Save List'
                            loadingRight={saving}
                            disabled={saving}
                            rounded={true}
                            onPress={() => this.saveList()}
                        />
                    </View>
                    <Divider style={{backgroundColor: theme.colors.black, marginTop: '2%'}} />
                    <Text style={theme.description}>Enter store name above to search for nearby locations.</Text>
                    <Maps position={position} searchResults={searchResults} theme={theme} />
                </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
});

export default withTheme(ListCreate);
