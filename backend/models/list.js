const mongoose  = require('mongoose');
const ObjectId = require('mongodb').ObjectID;

const schema = new mongoose.Schema({
    total: {
        type: Number,
        default: 0.00
    },
    items:{
        type: [String]
    },
    name: {
        type: String
    }
});

schema.methods.getItems = async function(items) {
    const Item = mongoose.model('Item');
    const docs = await Item.find({
        '_id': {
            $in: items.map(item => ObjectId(item))
        }
    });
    return docs || [];
}

schema.methods.listJSON = function() {
    return {
        total: this.total,
        items: schema.methods.getItems(this.items),
        name: this.name
    }
};

mongoose.model('List', schema);
