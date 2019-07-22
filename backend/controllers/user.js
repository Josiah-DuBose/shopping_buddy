const mongoose = require('mongoose');

exports.get = async (id) => {
    try {
        const User = mongoose.model('User');
        const user = await User.findOne({username: id}, {hash: 0, salt: 0, __v: 0});
        return user;
    } catch(err) {
        throw('Error retrieving users', err);
    }
}

exports.list = async (req) => {
    try {
        const User = mongoose.model('User');
        const users = await User.find({}, {hash: 0, salt: 0, __v: 0});
        return users;
    } catch(err) {
        throw('Error retrieving users', err);
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
        throw('Error creating user', err);
    }
}
