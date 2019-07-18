import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const TextLink = ({ onPress, linkText }) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onPress} style={styles.button}>
                <Text style={styles.text}>{linkText}</Text>
                </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        color: 'blue',
        fontSize: 18,
        fontWeight: '700',
        textDecorationLine: 'underline',
        paddingTop: 10,
        paddingBottom: 10
    },
    button: {
        marginTop: 5,
        marginBottom: 5
    }
});

export { TextLink };
