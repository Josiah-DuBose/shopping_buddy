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
        type: Number
    },
    store: {
        type: String
    }
});

schema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

schema.methods.itemJSON = function() {
    return {
        price: this.price,
        name: this.name,
        section: this.section,
        qty: this.qty,
        store: this.store
    }
};

mongoose.model('Item', schema);
