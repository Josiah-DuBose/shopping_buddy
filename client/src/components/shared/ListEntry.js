import React from 'react';
import { ListItem } from 'react-native-elements'
import { ClickIcon } from './';

const ListEntry = ({item, index, onPress, edit}) => {
    return (
        <ListItem title={item.name} key={index}
            subtitle={`$${(item.price * item.qty).toFixed(2)}`}
           style={{
               borderWidth: 1,
               borderRadius: 2,
               borderColor: 'grey',
               marginBottom: 4
           }}
           checkmark={item.done}
           onPress={onPress}
           leftIcon={
                <ClickIcon styles={{ marginRight: 15}}
                    name="edit"
                    size={25}
                    onPress={edit}
                />
           }
           rightTitle={`QTY:${item.qty}`}
       />
    );
}

export { ListEntry };
