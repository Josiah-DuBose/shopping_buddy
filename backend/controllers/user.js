const mongoose = require('mongoose');

exports.list = (req) => {
    return 'not implemented yet';
}

exports.create = async (req) => {
    try {
        const User = mongoose.model('User');
        const newUser = new User({
            email: req.body.email,
            username: req.body.username,
        });
        newUser.setPassword(req.body.password);
        newUser.save();
        return newUser.userJSON();
    } catch(err) {
        throw('Error creating user', err);
    }
}
