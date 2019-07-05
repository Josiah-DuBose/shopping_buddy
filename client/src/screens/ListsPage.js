import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

class ListsPage extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Lists</Text>
            </View>
        );
    }
}

export default ListsPage;

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