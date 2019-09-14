import React from 'react';
import { ListItem } from 'react-native-elements';
import { ClickIcon , CheckBox } from './';

const ListEntry = ({item, index, onPress, edit}) => {
    return (
        <ListItem title={item.name} key={index}
            subtitle={`Qty:${item.qty} Total: $${(item.price * item.qty).toFixed(2)}`}
            style={{
                borderWidth: 1,
                borderRadius: 2,
                borderColor: '#90a4ae'
            }}
            onPress={onPress}
            leftIcon={
                <CheckBox styles={{ marginRight: 15}} onPress={onPress} done={item.done}/>
            }
            rightIcon={
                <ClickIcon styles={{ marginRight: 15}}
                    name="edit"
                    size={20}
                    onPress={edit}
                />
            }
       />
    );
}

export { ListEntry };
