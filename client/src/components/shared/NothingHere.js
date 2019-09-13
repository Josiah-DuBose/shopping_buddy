import React from 'react';
import { StyleSheet, Text } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';


const NothingHere = ({label}) => {
    const str = `No ${label} yet, add one above.` 
    return (
        <Text style={styles.noItemsText}>{str}
            <MaterialIcon name={'arrow-top-right-thick'} size={20} />
        </Text>
    );
};

const styles = StyleSheet.create({
    noItemsText: {
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 20,
        fontWeight: 'bold',
        flexDirection: 'row',
    }

});

export { NothingHere }