const mongoose = require('mongoose');
const utils = require('../helpers/util');

exports.get = async (id) => {
    try {
        const List = mongoose.model('List');
        const list = await List.findOne({_id: id}).populate('items').populate('store');
        return list.listJSON();
    } catch(err) {
        throw(utils.createError(500, 'List retrieve error', err));
    }
}

exports.list = async () => {
    try {
        const List = mongoose.model('List');
        const lists = await List.find({}).populate('items').populate('store');
        return lists.map(list => list.listJSON());
    } catch(err) {
        throw(utils.createError(500, 'Lists retrieve error', err));
    }
}

exports.byUser = async (userId) => {
    try {
        const List = mongoose.model('List');
        const lists = await List.find({user: userId}).populate('items').populate('store');
        if (lists.length) {
            return lists.map(list => list.listJSON());
        }
        return [];
    } catch(err) {
        throw(utils.createError(500, 'Lists retrieve error', err));
    }
}

exports.create = async (req) => {
    try {
        // Create record for store.
        const Store = mongoose.model('Store');
        const store = await Store.create({
            name: req.body.store.name,
            location: req.body.store.location,
            user: req.body.user
        });

        // Create List
        const List = mongoose.model('List');
        const list = await List.create({
            total: 0.00,
            items: [],
            name: req.body.name,
            store: store._id,
            user: req.body.user
        });

        list.populate('store');
        return list.listJSON();
    } catch(err) {
        throw(utils.createError(500, 'List create error', err));
    }
}

exports.updateOne = async (req, id) => {
    try {
        const List = mongoose.model('List');
        const updateBody = req.body.newItem ? 
            { $push: { items: req.body.newItem } } : Object.assign({}, req.body);
        const list = await List.findOneAndUpdate({ _id: id }, updateBody,
            { new: true, useFindAndModify: false }
        ).populate('items').populate('store');
        return list.listJSON();
    } catch(err) {
        throw(utils.createError(500, 'Item update error', err));
    }
}

exports.deleteOne = async (id) => {
    try {
        const List = mongoose.model('List');
        const resp = await List.deleteOne({_id: id});
        return resp;
    } catch(err) {
        throw(utils.createError(500, 'List delete error', err));
    }
}
