const express = require('express');
const router = express.Router();
const storeController = require('../controllers/store');
const isAuthenticated = require('../middlewares/auth').isAuthenticated;

router.route('/find/:name').post(isAuthenticated, async (req, res, next) => {
    try {
        const response = await storeController.findStores(req.params['name']);
        res.json(response);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;