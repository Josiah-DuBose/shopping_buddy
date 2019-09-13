import React from 'react';
import { TouchableOpacity } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const CheckBox =({done, styles, onPress}) => {

    return (
        <TouchableOpacity style={styles} onPress={onPress}>
            {done ? 
                <Fontisto name={'checkbox-active'} size={20} /> :
                <Fontisto name={'checkbox-passive'} size={20} />
            }
            
        </TouchableOpacity>
    );
};

export { CheckBox };