const userRoute = require('./user');
const listRoute = require('./list');
const itemRoute = require('./item');
const storeRoute = require('./store');

module.exports = (app) => {
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/lists', listRoute);
    app.use('/api/v1/items', itemRoute);
    app.use('/api/v1/stores', storeRoute);
}
