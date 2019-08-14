const utils = require('../helpers/util');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

exports.isAuthenticated = async function(req, res, next) {
    const auth = _.get(req, 'headers.authorization');
    if (auth) {
        try {
            const token = auth.split(' ')[1];
            const result = await jwt.verify(token, process.env.SECRET);
            conosole.log('result', result)
            // Check token is expired.
            if (Date.now() >= result.exp) {
                next(utils.createError(401, 'Auth Error', 'Session has expired, please login again.'));
            } else {
                next();
            }
        } catch (err) {
            next(utils.createError(401, 'Auth Error', err.message));
        }
    } else {
        next(utils.createError(401, 'Unauthorized', 'Must be authenticated to preform this action'));
    }
}
