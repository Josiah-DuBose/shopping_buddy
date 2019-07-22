const mongoose  = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Must specify an email.'],
        index: true
    },
    username: {
        type: String,
        required: [true, 'Must specify a username.'],
    },
    hash: String,
    salt: String
}, {timestamp: true});

schema.methods.setPassword = (password) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

schema.methods.validPassword = (password) => {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

schema.methods.generateJWT = () => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

schema.methods.userJSON = () =>{
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
    };
};

schema.plugin(uniqueValidator, {message: 'Email is already taken.'});

mongoose.model('User', schema);
