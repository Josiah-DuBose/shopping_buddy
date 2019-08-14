const utils = require('../helpers/util');
const jwt = require('jsonwebtoken');

exports.isAuthenticated = async function(req, res, next) {
    const auth = req.headers.authroization;
    if (auth) {
        try {
            const token = auth.split(' ')[1];
            const result = await jwt.verify(token, process.env.SECRET);
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
