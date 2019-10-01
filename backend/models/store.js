const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        name: {type: String},
        coordinates: [Number]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

schema.index({loc: '2dsphere'});

mongoose.model('Store', schema);
