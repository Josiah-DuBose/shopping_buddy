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
        type: Schema.Types.ObjectId,
        ref: 'Store'
    }
});

// schema.pre('remove', async function(next) {
//     const Item = mongoose.model('Item');
//     const Store = mongoose.model('Store');
//     try {
//         await Store.deleteOne({_id: this.store});
//         await Item.deleteMany({_id: {$in: this.items}}); 
//         next();
//     } catch(err) {
//         console.error(`Error removing related docs: ${err}`);
//     }
// });

schema.methods.listJSON = function() {
    return {
        items: schema.methods.formattedList(this.items),
        name: this.name,
        id: this.id,
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
