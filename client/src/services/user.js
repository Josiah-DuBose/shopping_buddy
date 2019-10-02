import AsyncStorage from '@react-native-community/async-storage';
import apiRequest from './apiRequest';

exports.saveUser = async function (type, id, body) {
    const create = type === 'create';
    const options = {
        url: create ? `users/create` : `users/${id}`,
        method: create ? 'POST' : 'PUT',
        body: body
    };

    const userSession = await apiRequest(options);
    console.log("userSession", userSession)
    if (userSession) {
        if (create) {
            await AsyncStorage.setItem('userToken', userSession.token);
            delete userSession.token;
        }

        await AsyncStorage.setItem('userID', userSession.id);
        delete userSession.id
        await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
        
        if (create) {
            this.props.navigation.navigate('Home');
        }
    }
};