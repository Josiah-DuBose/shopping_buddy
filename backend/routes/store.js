const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store');
const isAuthenticated = require('../middlewares/auth').isAuthenticated;

router.route('/find/:name/:latitude/:longitude').get(isAuthenticated, async (req, res, next) => {
    try {
        const reqParams = {
            name: req.params['name'],
            longitude: req.params['longitude'],
            latitude: req.params['latitude']
        }
        const response = await storeController.findStores(reqParams);
        res.json(response);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;