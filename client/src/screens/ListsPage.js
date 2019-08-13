import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Loading, Input, Button, Navigation } from '../components/shared';

export default class ListsPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Navigation />
                <View style={styles.container}>
                    <Text style={styles.description}>Lists</Text>
                </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    description: {
        marginBottom: 450,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    container: {
        padding: 30,
    }
});
