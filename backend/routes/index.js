const app = require('../server')();
const userRoute = require('./user');
// const listRoute = require('./list');
// const itemRoute = require('./item');

console.log("\n\napp", app)
app.use('/api/v1/users', userRoute);
// app.use('/api/v1/items', itemRoute);
// app.use('/api/v1/list', listRoute);
