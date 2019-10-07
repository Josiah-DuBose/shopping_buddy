const mongoose = require('mongoose');
const utils = require('../helpers/util');
const request = require('request');

exports.findStores = async (name) => {
    try {
        const API_KEY = process.env.GOOGLE_API_KEY;
        const options = {
            uri: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${name}&inputtype=textquery&key=${API_KEY}`,
            method: 'GET'
        }
        const response = await request(options);
        console.log("response", response);
        return response;
    } catch(err) {
        throw(utils.createError(500, 'Store search error', err));
    }
}