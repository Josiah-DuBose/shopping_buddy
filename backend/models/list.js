const mongoose  = require('mongoose');

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
    const arr = items.map(item => new mongoose.Types.ObjectId(item));
    const docs = await Item.find({}).where('_id').in(arr).exec();
    return docs;
}

schema.methods.listJSON = async function() {
    const items = await schema.methods.getItems(this.items);
    const total = items.reduce((total, item) => total + item.price, 0.00);
    return {
        total: total,
        items: items,
        name: this.name
    }
};

mongoose.model('List', schema);
