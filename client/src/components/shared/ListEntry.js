import React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'
import { ClickIcon } from './';

const ListEntry = ({item, onPress, edit}) => {
    return (
        <ListItem title={item.name}
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
       />
    );
}

export { ListEntry };
