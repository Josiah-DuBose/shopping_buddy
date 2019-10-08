const mongoose = require('mongoose');
const utils = require('../helpers/util');
const _ = require('lodash');
const googleMapsClient = require('@google/maps').createClient({
    key: process.env.GOOGLE_API_KEY,
    Promise: Promise
});

exports.findStores = async (req) => {
    try {
       const response = await googleMapsClient.placesNearby({
            location: [req.latitude, req.longitude],
            keyword: req.name,
            radius: 5000
        }).asPromise();
        if (_.get(response, 'json.results')) {
            return response.json.results
        } else {
            throw {message: 'Store search error: Unexpected return format.'}
        }
    } catch(err) {
        throw(utils.createError(500, err.message || 'Store search error', err));
    }
}