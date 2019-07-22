const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.route('/:id').get(async (req, res, next) => {
    try {
        const response = await userController.get(req.params['id']);
        res.json(response);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/list').get(async (req, res, next) => {
    try {
        const response = await userController.list(req);
        res.json(response);
    } catch(err) {
        console.error(err);
        next(err);
    }
});

router.route('/create').post(async (req, res, next) => {
    try {
        const response = await userController.create(req);
        res.json(response);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/login').post(async (req, res, next) => {
    try {
        const response = await userController.login(req);
        res.json(response);
    } catch (err) {
        console.error(err);
        next(err);
    }
});


module.exports = router;
