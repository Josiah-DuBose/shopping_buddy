import AsyncStorage from '@react-native-community/async-storage';
import config from '../config';

const API_HOST = config.api.host;
const API_BASE = config.api.baseUrl;

const request = async function(options) {
    try {
        const reqOptions = {
            method: options.method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };

        if (options.auth) {
            const token = await AsyncStorage.getItem('userToken');
            reqOptions.headers['Authorization'] = `Bearer ${token}`;
        }

        if (options.body) {
            reqOptions.body = options.body;
        }
        console.log('reqOptions', reqOptions)
        const response = await fetch(`${API_HOST}/${API_BASE}/${options.url}`, reqOptions);
        console.log("reqResponse", response);
        const json = await response.json();

        if (response.ok && json) {
            return json;
        } else {
            throw json;
        }
    } catch(err) {
        alert(err.detail);
        if (err.statusCode === 401) {
            this.props.navigation.navigate('Auth');
            alert('Session expired, please log in again.')
        }
    }
}

export default request;