require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const port = process.env.PORT || 8550;
const app = express();
const routes = require('./routes');

// Models
require('./models/user');

//Connect to DB;
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({
  extended: true
}));

// Define Routes
routes(app);

app.listen(port, () => console.log(`API listening on port ${port}!`))

module.exports = { app };
