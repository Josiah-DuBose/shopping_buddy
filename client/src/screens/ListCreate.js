import React, { Component } from 'react';
import { View } from 'react-native';
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
            storeName: '',
            storeLocation: {},
        };
        this.state = {
            saving: false,
            loading: false,
            list: _.get(this.props, 'navigation.state.params.list') || newList,
            create: !_.get(this.props, 'navigation.state.params.list'),
            theme: _.get(this.props, 'theme'),
            position: {},
            searchResults: [],
        };

        this.saveList = this.saveList.bind(this);
        this.validList = this.validList.bind(this);
        this.searchStore = this.searchStore.bind(this);
        this.markerPress = this.markerPress.bind(this);
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
        this.setState({saving: true});
        const store = this.state.list.storeName;
        const latitude = this.state.position.latitude;
        const longitude = this.state.position.longitude;
        const searchOptions = {
            url: `stores/find/${store}/${latitude}/${longitude}`,
            method: 'GET',
            auth: true
        }

        const response = await apiRequest(searchOptions);
        this.setState({saving: false, searchResults: response});
    }

    validList() {
        const { list } = this.state; 
        return list.name && list.storeName && !_.isEmpty(list.storeLocation);
    }

    async saveList() {
        this.setState({saving: true});
        
        if (!this.validList()) {
            alert('fill in all fields and select a store');
            this.setState({saving: false});
            return 
        };

        const create = this.state.create;
        const { list } = this.state;
        const listOptions = {
            url: create ? `lists/create` : `lists/${list.id}`,
            method: create ? 'POST' : 'PUT',
            auth: true,
            user: true,
            body: {
                name: list.name,
                store: {
                    name: list.storeName,
                    location: list.storeLocation
                }
            }
        };
        
        await apiRequest(listOptions);
        this.setState({saving: false});
        this.props.navigation.push('Lists');
    }

    async markerPress(event) {
        const coord = await event.nativeEvent.coordinate;
        this.setState(state => {
            return {
                ...state,
                list: {
                    ...state.list,
                   storeLocation: coord
                }
            };
        });
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
                            value={list.storeName}
                            leftIconContainerStyle={theme.leftInputIconContainerStyle}
                            inputContainerStyle={theme.inputContainerStyle}
                            onChangeText={name =>
                                this.setState(state => {
                                return {
                                    ...state,
                                    list: {
                                        ...state.list,
                                        storeName: name
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
                            loadingRight={saving}
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
                    <Maps position={position} searchResults={searchResults} theme={theme} onPress={this.markerPress.bind(this)}/>
                </React.Fragment>
                }
            </React.Fragment>
        );
    }
}

export default withTheme(ListCreate);
