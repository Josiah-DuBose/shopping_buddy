const mongoose = require('mongoose');
const utils = require('../helpers/util');


exports.get = async (id) => {
    try {
        const Item = mongoose.model('Item');
        const item = await Item.findOne({_id: id})
        return item.itemJSON();
    } catch(err) {
        throw(utils.createError(500, 'Item retrieve error', err));
    }
}

exports.list = async (req) => {
    try {
        const Item = mongoose.model('Item');
        const items = await Item.find({});
        return items.map(item => item.itemJSON());
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
