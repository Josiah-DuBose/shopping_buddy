const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    latlng: {
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        }
    },
    address: {
        type: String
    },
    icon: {
        type: String
    }, 
    open_now: {
        type: Boolean
    },
    place_id: {
        type: String
    },
    price_level: {
        type: Number
    },
    rating: {
        type: Number
    },
    user_ratings_total: {
        type: Number
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
});

mongoose.model('Store', schema);
