const mongoose = require('mongoose');
const utils = require('../helpers/util');


exports.get = async (id) => {
    try {
        const List = mongoose.model('List');
        const list = await List.findOne({_id: id}).populate('items');
        return list.listJSON();
    } catch(err) {
        throw(utils.createError(500, 'List retrieve error', err));
    }
}

exports.list = async (req) => {
    try {
        const List = mongoose.model('List');
        const lists = await List.find({}).populate('items');
        return lists.map(list => list.listJSON());
    } catch(err) {
        throw(utils.createError(500, 'Lists retrieve error', err));
    }
}

exports.create = async (req) => {
    try {
        const List = mongoose.model('List');
        const list = await List.create({
            total: 0.00,
            items: [],
            name: req.body.name,
            store: req.body.store,
            user: req.body.user
        });
        return list.listJSON();
    } catch(err) {
        throw(utils.createError(500, 'List create error', err));
    }
}

exports.updateOne = async (req, id) => {
    console.log("req", req.body)
    try {
        const List = mongoose.model('List');
        const updateBody = req.body.newItem ? 
            {
                $push: { items: req.body.newItem }
            } :
            Object.assign({}, req.body);
        let list = await List.findOneAndUpdate({_id: id}, updateBody,
            {
                new: true,
                useFindAndModify: false
            }
        );
        list = await list.populate('items');
        return list.listJSON();
    } catch(err) {
        throw(utils.createError(500, 'Item update error', err));
    }
}
