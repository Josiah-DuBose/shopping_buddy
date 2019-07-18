require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const config = require('./config');
const mongoose = require('mongoose');
const port = process.env.PORT || 8550;
const app = express();

//Connect to DB;
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }));

require('./models/user');

module.exports = { app };

app.use(require('./routes'));
