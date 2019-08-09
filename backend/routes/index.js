const userRoute = require('./user');
const listRoute = require('./list');
const itemRoute = require('./item');

module.exports = (app) => {
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/lists', listRoute);
    app.use('/api/v1/items', itemRoute);
}
