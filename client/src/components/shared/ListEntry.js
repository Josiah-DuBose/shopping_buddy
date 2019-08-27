import React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'

const ListEntry = ({item, index}) => {
    console.log("item", item, index);
    return (
        <ListItem key={index}
            title={item.name}
            checkmark={item.done}
            onPress={() => item.done = !item.done}
        />
    );
}

export { ListEntry };
