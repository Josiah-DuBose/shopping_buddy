const mongoose  = require('mongoose');

const schema = new mongoose.Schema({
    total: {
        type: Number,
        default: 0.00
    },
    items: [String],
    name: {
        type: String
    }
});

// Getter
schema.path('total').get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
schema.path('total').set(function(num) {
  return num * 100;
});


mongoose.model('List', schema);
