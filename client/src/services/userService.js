import AsyncStorage from '@react-native-community/async-storage';
import apiRequest from './apiRequest';

const manageSession = async (userSession, updateToken) => {
    try {
        if (updateToken) {
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
    const updateToken = type === 'create';
    const options = {
        url: updateToken ? `users/create` : `users/${id}`,
        method: updateToken ? 'POST' : 'PUT',
        body: body
    };

    const userSession = await apiRequest(options);
    if (userSession) {
        return manageSession(userSession, updateToken);
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
        return manageSession(userSession, true);
    }
}

exports.checkToken = async function(userToken) {
    const options = {
        url: 'users/check-token',
        method: 'Post',
        body: {
            token: userToken
        }
    };
    const response = await apiRequest(options);
    if (response && response.token) {
        return response.token;
    } else {
        return false;
    }
}

