import React from 'react';
import { TouchableOpacity } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ClickIcon =({name, size, styles, onPress}) => {
    return (
        <TouchableOpacity style={styles} onPress={onPress}>
            <FontAwesome5 name={name} size={size} />
        </TouchableOpacity>
    );
};

export { ClickIcon };
