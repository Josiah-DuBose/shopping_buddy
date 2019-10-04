import React from 'react';
import { ListItem } from 'react-native-elements';
import { CheckBox } from './';

const ListEntry = ({item, index, onPress, style}) => {
    return (
        <ListItem 
            title={item.name} 
            key={index}
            subtitle={`Qty:${item.qty} Total: $${(item.price * item.qty).toFixed(2)}`}
            style={style}
            onPress={onPress}
            leftIcon={
                <CheckBox styles={{ marginRight: 15}} onPress={onPress} done={item.done}/>
            }
        />
    );
}

export { ListEntry };
