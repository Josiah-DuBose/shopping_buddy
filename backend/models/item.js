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

// Getter
schema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
schema.path('price').set(function(num) {
  return num * 100;
});


mongoose.model('Item', schema);
