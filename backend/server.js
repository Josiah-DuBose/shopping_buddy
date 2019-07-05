require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const config = require('./config');
const mongoose = require('mongoose');
const port = process.env.PORT || 8550;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(config('/database'));
const db = mongoose.connection; 