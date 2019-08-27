const mongoose  = require('mongoose');

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
    }
});

mongoose.model('Item', schema);
