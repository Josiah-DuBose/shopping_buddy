const mongoose = require('mongoose');
const utils = require('../helpers/util');


exports.get = async (id) => {
    try {
        const Item = mongoose.model('Item');
        const item = await Item.findOne({_id: id})
        return item;
    } catch(err) {
        throw(utils.createError(500, 'Item retrieve error', err));
    }
}

exports.list = async (req) => {
    try {
        const Item = mongoose.model('Item');
        const items = await Item.find({});
        return items;
    } catch(err) {
        throw(utils.createError(500, 'Item retrieve error', err));
    }
}

exports.create = async (req) => {
    try {
        const Item = mongoose.model('Item');
        let item = await Item.create({
            price: req.body.price,
            name: req.body.name,
            section: req.body.section,
            qty: req.body.qty,
            store: req.body.stores
        });
        return item;
    } catch(err) {
        throw(utils.createError(500, 'Item create error', err));
    }
}

exports.updateOne = async (req, id) => {
    try {
        const Item = mongoose.model('Item');
        let item = await Item.findOneAndUpdate(
            {_id: id},
            {
                price: req.body.price,
                name: req.body.name,
                section: req.body.section,
                qty: req.body.qty,
                store: req.body.stores,
                done: req.body.done
            },
            {
                new: true,
                useFindAndModify: false
            }
        );
        return item;
    } catch(err) {
        throw(utils.createError(500, 'Item update error', err));
    }
}

exports.deleteOne = async (id) => {
    try {
        const Item = mongoose.model('Item');
        let resp = await Item.remove({_id: id});
        return resp;
    } catch(err) {
        throw(utils.createError(500, 'Item update error', err));
    }
}
