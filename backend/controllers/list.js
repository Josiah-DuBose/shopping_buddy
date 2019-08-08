const mongoose = require('mongoose');
const utils = require('../helpers/util');


exports.get = async (id) => {
    try {
        const List = mongoose.model('List');
        const list = await List.findOne({_id: id})
        return list;
    } catch(err) {
        throw(utils.createError(500, 'List retrieve error', err));
    }
}

exports.list = async (req) => {
    try {
        const List = mongoose.model('List');
        const lists = await List.find({});
        return lists;
    } catch(err) {
        throw(utils.createError(500, 'List retrieve error', err));
    }
}

exports.create = async (req) => {
    try {
        const List = mongoose.model('List');
        let list = await List.create({
            total: req.body.total || 0.00,
            items: req.body.items || [],
            name: req.body.name
        });
        return list;
    } catch(err) {
        throw(utils.createError(500, 'User create error', err));
    }
}
