const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    location: {
        latitude: {
            type: Number
        },
        longitude: {
            Number
        }
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

mongoose.model('Store', schema);
