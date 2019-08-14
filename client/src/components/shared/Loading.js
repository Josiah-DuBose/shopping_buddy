import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loading = ({ size, msg }) => {
    const loadingMsg = msg || 'Loading';
    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size={size}/>
            <Text style={styles.description}>
                {loadingMsg}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerContainer: {
        flex: -1,
        marginTop: 12,
        marginBottom: 12
    },
    description: {
        textAlign: 'center',
        color: '#656565'
    },
});

export { Loading };
