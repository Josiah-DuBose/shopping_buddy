import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ListsPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Lists</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
        marginTop: 65,
        alignItems: 'center'
    }
});