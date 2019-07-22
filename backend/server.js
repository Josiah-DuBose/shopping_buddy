require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const port = process.env.PORT || 8550;
const app = express();

// Models
require('./models/user');

// Routers
const userRouter = require('./routes/user');

//Connect to DB;
mongoose.connect(process.env.DB_URI, {useNewUrlParser: true});

app.use(bodyParser.urlencoded({ extended: false }));

// Define Routes
app.use('/api/v1/users', userRouter);

app.listen(port, () => console.log(`API listening on port ${port}!`))

module.exports = { app };
