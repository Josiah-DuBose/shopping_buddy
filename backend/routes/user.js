const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.route('/:id').get(async (req, res) => {
    try {
        const response = await userController.get(req.params['id']);
        res.json(response);
    } catch(err) {
        console.error(err);
    }
});

router.route('/list').get(async (req, res) => {
    try {
        const response = await userController.list(req);
        res.json(response);
    } catch(err) {
        console.error(err);
    }
});

router.route('/create').post(async (req, res) => {
    try {
        const response = await userController.create(req);
        res.json(response);
    } catch (err) {
        console.error(err);
    }
});


module.exports = router;
