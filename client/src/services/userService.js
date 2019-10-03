import AsyncStorage from '@react-native-community/async-storage';
import apiRequest from './apiRequest';

const manageSession = async (userSession, token) => {
    try {
        if (token) {
            await AsyncStorage.setItem('userToken', userSession.token);
            delete userSession.token;
        }
        await AsyncStorage.setItem('userID', userSession.id);
        delete userSession.id
        await AsyncStorage.setItem('userSession', JSON.stringify(userSession));
        return true;
    } catch (err) {
        alert(err);
        return false;
    }
}

exports.saveUser = async function (type, body, id) {
    const token = type === 'create';
    const options = {
        url: create ? `users/create` : `users/${id}`,
        method: create ? 'POST' : 'PUT',
        body: body
    };

    const userSession = await apiRequest(options);
    if (userSession) {
        return manageSession(userSession, token);
    }
};

exports.login = async function (user) {
    const options = {
        url: 'users/login',
        method: 'POST',
        body: {
            username: user.username,
            password: user.password
        },
    };
    const userSession = await apiRequest(options);
    if (userSession) {
        return manageSession(userSession, token);
    }
}
