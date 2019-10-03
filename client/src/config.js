const appConfig = {
    env: process.env,
    api: {
        host: process.env.NODE_ENV === 'development' ? 'http://localhost:8550' : '', 
        // TODO: update with prod host
        baseUrl: 'api/v1'
    },
    googleMaps: {
        api_key: 'AIzaSyCDjfAaCn8TjBvhDHIL8dfBHQ5mYEDrXUk'
    }
};

export default appConfig;
