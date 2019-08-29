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
    },
    store: {
        type: String
    }
});

schema.methods.listJSON = function() {
    // Get list total.
    const total = (this.items || []).reduce((total, item) => total + (item.price * item.qty), 0.00).toFixed(2);
    return {
        total: total,
        items: schema.methods.formattedList(this.items),
        name: this.name,
        _id: this.id,
        store: this.store
    }
};

schema.methods.formattedList = function(items) {
    const sections = [];
    try {
        items.forEach(item => {
            const indexOfItem = sections.findIndex(section => section.title === item.section);
            if (indexOfItem < 0) {
                sections.push({title: item.section, data: [item]});
            } else {
                sections[indexOfItem]['data'].push(item);
            }
        });
        return sections;
    } catch(err) {
        console.error(err);
    }
}

mongoose.model('List', schema);
