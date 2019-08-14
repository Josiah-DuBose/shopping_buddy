const mongoose = require('mongoose');
const utils = require('../helpers/util');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

exports.get = async (id, internal) => {
    try {
        const User = mongoose.model('User');
        const user = internal ?
            await User.findOne({username: id}) :
            await User.findOne({username: id}, {hash: 0, salt: 0, __v: 0});
        return user;
    } catch(err) {
        throw(utils.createError(500, 'User retrieve error', err));
    }
}

exports.list = async (req) => {
    try {
        const User = mongoose.model('User');
        const users = await User.find({}, {hash: 0, salt: 0, __v: 0});
        return users;
    } catch(err) {
        throw(utils.createError(500, 'User retrieve error', err));
    }
}

exports.create = async (req) => {
    try {
        const User = mongoose.model('User');
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
        });
        newUser.setPassword(req.body.password);
        await newUser.save();
        return newUser.userJSON();
    } catch(err) {
        throw(utils.createError(500, 'User create error', err));
    }
}

exports.login = async (req) => {
    try {
        const User = mongoose.model('User');
        const userProfile = await exports.get(req.body.username, true);
        if (!userProfile) {
            return {
                message: 'User not found',
                status: 'Fail'
            };
        } else {
            const validPassword = userProfile.validPassword(req.body.password);
            if (!validPassword) {
                return {
                    message: 'Invalid password',
                    status: 'Fail'
                }
            } else{
                return userProfile.userJSON();
            }
        }
    } catch(err) {
        throw utils.createError(500, 'Login error', err);
    }
}

exports.isAuthenticated = async (req) => {
    const token = req.body.token;
    if (token) {
        try {
            const result = await jwt.verify(token, process.env.SECRET);
            if (Date.now() >= result.exp) {
                return {token: false};
            } else {
                return {token: true};
            }
        } catch(err) {
            throw utils.createError(500, 'Token verify error', err);
        }
    }
}
