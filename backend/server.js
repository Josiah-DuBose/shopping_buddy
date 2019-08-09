require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const path  = require('path');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const port = process.env.PORT || 8550;
const app = express();
const routes = require('./routes');

// Models
require('./models/user');
require('./models/list');
require('./models/item');

//Connect to DB;
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});

// Parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// Define Routes
routes(app);

// Error handler
app.use(function (err, req, res, next) {
    if (!_.isEmpty(err)) {
        res.status(_.get(err, 'code', 500));
        res.json({
            title: _.get(err, 'title', 'Error'),
            detail: _.get(err, 'detail', err).toString()
        });
    }
});


app.listen(port, () => console.log(`API listening on port ${port}!`))

module.exports = app;
