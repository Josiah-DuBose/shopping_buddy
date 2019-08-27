import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Loading, ListEntry, ClickIcon } from '../components/shared';
import { Input } from 'react-native-elements';
import Entypo from 'react-native-vector-icons/Entypo';

export default class ItemPage extends Component {
    constructor(props) {
        super(props)
        const newItem = {
            price: 0.00,
            name: '',
            section: '',
            qty: '',
        }

        this.state = {
            saving: false,
            item: this.props.navigation.state.params && this.props.navigation.state.params.item ?
                this.props.navigation.state.params.item : newItem
        };
        console.log("this.state item",this.state);
        this.updateItem = this.updateItem.bind(this);
    }

    updateItem(value) {
        console.log("value")
    }

    render() {
        const { saving, item } = this.state;
        return (
            <View style={styles.container}>
                <Input
                    placeholder={item.name || 'Enter item name'}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    onChangeText={(e) => item.name = e}
                    leftIcon={<Entypo name={'edit'} size={20} />}
                />
                <Input
                    placeholder={item.price || 'Enter item price'}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    onChangeText={(e) => item.price = e}
                    leftIcon={<Entypo name={'price-tag'} size={20} />}
                />
                <Input
                    placeholder={item.section || 'Enter item section'}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    onChangeText={(e) => item.section = e}
                    leftIcon={<Entypo name={'shopping-cart'} size={20} />}
                />
                <Input
                    placeholder={item.qty || 'Enter item Qty'}
                    leftIconContainerStyle={styles.leftIconContainerStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    onChangeText={(e) => item.qty = e}
                    leftIcon={<Entypo name={'calculator'} size={20} />}
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
    }
});
