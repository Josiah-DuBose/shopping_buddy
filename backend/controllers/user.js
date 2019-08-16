const mongoose = require('mongoose');
const utils = require('../helpers/util');
const _ = require('lodash');
const jwt = require('jsonwebtoken');

exports.get = async (username) => {
    try {
        const User = mongoose.model('User');
        const user = await User.findOne(
            {username: username},
            {hash: 0, salt: 0, __v: 0}
        );

        if (!user) {
            throw { message: 'User not found.', code: 404 };
        }

        return user.userJSON(true);
    } catch(err) {
        throw(utils.createError(
            err.code || 500,
            'User retrieve error',
            err.message || err)
        );
    }
}

exports.list = async (req) => {
    try {
        const User = mongoose.model('User');
        const users = await User.find({}, {hash: 0, salt: 0, __v: 0});
        return users.map(user => user.userJSON());
    } catch(err) {
        throw(utils.createError(500, 'Users retrieve error', err));
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
        return newUser.userJSON(true);
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
                return userProfile.userJSON(true);
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
