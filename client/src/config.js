const appConfig = {
    env: process.env,
    api: {
        host: process.env.NODE_ENV === 'development' ? 'http://localhost:8550' : '', 
        // TODO: update with prod host
        baseUrl: 'api/v1'
    }
};

export default appConfig;
