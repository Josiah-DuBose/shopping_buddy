import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';

const Loading = ({ size, msg }) => {
    const loadingMsg = msg || 'Loading';
    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size={size}/>
            <Text>
                {loadingMsg}
            </Text>
        </View>
    );
};

const styles = {
    spinnerContainer: {
        flex: -1,
        marginTop: 12,
        marginBottom: 12
    }
};

export { Loading };
