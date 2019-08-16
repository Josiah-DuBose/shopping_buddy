const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    total: {
        type: Number,
        default: 0.00
    },
    items:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    name: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

schema.methods.listJSON = function() {
    // Get list total.
    const total = (this.items || []).reduce((total, item) => total + item.price, 0.00);
    return {
        total: total,
        items: this.items,
        name: this.name
    }
};

mongoose.model('List', schema);
