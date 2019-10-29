const mongoose = require('mongoose');
const utils = require('../helpers/util');
const _ = require('lodash');
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY,
    Promise: Promise
});

const mapPlacesResponse = (places) => {
    return places.map(place => (
        {
            name: place.name,
            latlng: {
                latitude: _.get(place, 'geometry.location.lat') || 0,
                longitude: _.get(place, 'geometry.location.lng') || 0
            },
            icon: place.icon || '',
            place_id: place.place_id || '',
            price_level: place.price_level || '',
            address: place.vicinity || '',
            open_now: _.get(place, 'opening_hours.open_now') || false,
            viewport: place.viewport || '',
            rating: place.rating || 0,
            user_ratings_total: place.user_ratings_total || 0
        }
    ));
}

exports.findStores = async (req) => {
    try {
       const response = await googleMapsClient.placesNearby({
            location: [req.latitude, req.longitude],
            keyword: req.name,
            radius: 2000
        }).asPromise();
        if (_.get(response, 'json.results')) {
            return mapPlacesResponse(response.json.results);
        } else {
            throw {message: 'Store search error: Unexpected return format.'}
        }
    } catch(err) {
        throw(utils.createError(500, err.message || 'Store search error', err));
    }
}

exports.create = async (req) => {
    try {
        const Store = mongoose.model('Store');
        const store = await Store.create({...req});
        return store; 
    } catch(err) {
        throw(utils.createError(500, 'Store create error', err));
    }
}

exports.updateOne = async (id, req) => {
    try {
        const Store = mongoose.model('Store');
        const store = await Store.findOneAndUpdate({_id: id},{...req}, {new: true});
        return store;
    } catch(err) {
        throw(utils.createError(500, 'Store create error', err));
    }
}

exports.get = async (id) => {
    try {
        const Store = mongoose.model('Store');
        const store = await Store.findOne({place_id: id});
        return store;
    } catch(err) {
        throw(utils.createError(500, 'Store finOne error', err));
    }
}