const mongoose = require('mongoose');
const utils = require('../helpers/util');
const storeController = require('./store');

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
        const storeResp = await storeController.create(req.body.store);

        // Create List
        const List = mongoose.model('List');
        const list = await List.create({
            total: 0.00,
            items: [],
            name: req.body.name,
            store: storeResp._id,
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
        const request = req.body;
        // Update record for store if store data sent.
        console.log("store", request.store);
        if (_.get(request, 'store')) {
            let storeResp;
            const storeFound = await storeController.findOne(request.store.place_id);
            if (storeFound) {
                storeResp = await storeController.updateOne(request.store);
                request.store = storeResp._id;
            } else {
                storeResp = await storeController.create(request.store);
                request.store = storeResp._id;
            }
        }
        
        const List = mongoose.model('List');
        const updateBody = request.newItem ? 
            { $push: { items: req.body.newItem } } : {...req.body};
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
