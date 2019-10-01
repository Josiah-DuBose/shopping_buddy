const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    price: {
        type: Number,
        default: 0.00
    },
    name: {
        type: String
    },
    section: {
        type: String
    },
    qty: {
        type: Number,
        default: 1
    },
    done: {
        type: Boolean,
        default: false
    },
    list: {
        type: Schema.Types.ObjectId,
        ref: 'List'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

mongoose.model('Item', schema);
