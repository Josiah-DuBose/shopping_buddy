const mongoose  = require('mongoose');

const schema = new mongoose.Schema({
    total: {
        type: Number,
        default: 0.00
    },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    name: {
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


mongoose.model('List', schema);
