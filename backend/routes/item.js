const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item');
const isAuthenticated = require('../middlewares/auth').isAuthenticated;

router.route('/').get(isAuthenticated, async (req, res, next) => {
    try {
        const response = await itemController.list();
        res.json(response);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/by-user/:userId').get(isAuthenticated, async (req, res, next) => {
    try {
        const response = await itemController.byUser(req.params['userId']);
        res.json(response);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id').get(isAuthenticated, async (req, res, next) => {
    try {
        const response = await itemController.get(req.params['id']);
        res.json(response);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id').put(isAuthenticated, async (req, res, next) => {
    try {
        const response = await itemController.updateOne(req, req.params['id']);
        res.json(response);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id').delete(isAuthenticated, async (req, res, next) => {
    try {
        const response = await itemController.deleteOne(req.params['id']);
        res.json(response);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/create').post(isAuthenticated, async (req, res, next) => {
    try {
        const response = await itemController.create(req);
        res.json(response);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;
