const listsRoute = require('./lists');
const userRoute = require('./user');
const itemRoute = require('./item');
const app = require('./server');

app.use('/api/v1/users', userRoute);
app.use('/api/v1/items', itemRoute);
app.use('/api/v1/list', listRoute);
