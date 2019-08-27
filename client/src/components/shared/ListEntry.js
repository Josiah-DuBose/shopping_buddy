import React from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements'

const ListEntry = ({item}) => {
    console.log("item", item)
    return (
        <ListItem title={item.name}
            checkmark={item.done}
            onPress={() => item.done = !item.done}
        />
    );
}

export { ListEntry };
