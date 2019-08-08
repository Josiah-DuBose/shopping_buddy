const express = require('express');
const router = express.Router();
const listController = require('../controllers/list');
const isAuthenticated = require('../middlewares/auth').isAuthenticated;

router.route('/').get(isAuthenticated, async (req, res, next) => {
    try {
        const response = await listController.list(req);
        res.json(response);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id').get(isAuthenticated, async (req, res, next) => {
    try {
        const response = await listController.get(req.params['id']);
        res.json(response);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/create').post(async (req, res, next) => {
    try {
        const response = await listController.create(req);
        res.json(response);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
